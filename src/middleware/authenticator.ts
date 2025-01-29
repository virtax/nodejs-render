import jwt from "jsonwebtoken";

export const JWT_SECRET_KEY = process.env['JWT_SECRET_KEY'];  // для підпису токена

// Middleware для перевірки токена
export function authenticateToken(req, res, next) {
  // const token = req.headers['authorization']?.split(' ')[1];
  const token = req.cookies['accessToken'];
  if (!token) {
    res.status(401).send('Access Denied');
    return;
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(403).send('Invalid Token');
      return;
    }
    req['username'] = payload.username;
    next();
  });
}
