import { Router, Request, Response } from "express";
import { userService } from "../services/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticateToken, JWT_SECRET_KEY } from "../middleware/authenticator";

const userAdminRouter = Router();

userAdminRouter.get("/register", (req, res) => {
  res.render("register");
})


userAdminRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserBy({
    email
  });

  if (user) {
    res.status(400).send('User already exists');
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await userService.createUser( { name: email, email, age: 0, passwordHash})

  res.redirect('/login');
});



userAdminRouter.get("/login", (req, res) => {
  res.render("login");
})

userAdminRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserBy({email});

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    res.status(401).send('Invalid credentials');
    return;
  }

  const token = jwt.sign({ username: user.email }, JWT_SECRET_KEY, {
    expiresIn: '3h',
  }); // Генерація токена
  // res.json({ token });
  res.cookie('accessToken', token, {
    httpOnly: true,
    sameSite: 'strict',
  })
  res.redirect('/profile');
});


// Захищений маршрут
userAdminRouter.get('/profile', authenticateToken, async (req, res) => {
  const email = req['username'];
  const user = await userService.getUserWithSales({email});
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  const sales = user.sales;

  res.render("profile", {
    email,
    name: user.name,
    age: user.age,
    salary: user.salary,
    sales,
  });
});

userAdminRouter.post('/profile', authenticateToken, async (req, res) => {
  const email = req['username'];
  const { name, age, salary } = req.body;
  const user = await userService.getUserBy({email});
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  await userService.updateUser(user.id, { email, name, age, salary });
  res.status(200).send('User saved');
});




export default userAdminRouter;
