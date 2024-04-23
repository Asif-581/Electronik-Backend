import { Router } from "express";
import productRoutes from "./productRoutes/productRoutes";
import categoryRoutes from "./productRoutes/categoryRoutes";
import companyRoutes from "./productRoutes/companyRoutes";
import userSingUpRoutes from "./userRoutes/signUpRoutes";
import userSingInRoutes from "./userRoutes/signInRoutes";
import userDetailsRoutes from "./userRoutes/userDetailsRoutes";
import userLogoutRoutes from "./userRoutes/logOutRoutes";
import cartRoutes from './cartRoutes/cartRoutes'
import orderRoutes from './orderRoutes/orderRoutes'

const router = Router();

router.use("/api/products", productRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/companies", companyRoutes);
router.use("/api/signup", userSingUpRoutes);
router.use("/api/signin", userSingInRoutes);
router.use("/api/user_details", userDetailsRoutes);
router.use("/api/logout", userLogoutRoutes);
router.use("/api/cart", cartRoutes);
router.use("/api/orders",orderRoutes);

export default router;
