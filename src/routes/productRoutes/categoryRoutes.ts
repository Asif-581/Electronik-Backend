import { Router } from "express";
import { getCategories } from "../../controllers/products/categoryController";
const router = Router();

router.get("/", getCategories);

export default router;
