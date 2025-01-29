import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services/UserService";
import { authenticateToken } from "../middleware/authenticator";

const saleAdminRouter = Router();

saleAdminRouter.get('/', authenticateToken, async (req, res) => {
  const email = req['username'];
  const user = await userService.getUserWithSales({
    email
  });

  res.render('sales', {
    test: user.sales,
    sales: user.sales
  });

})


export default saleAdminRouter;
