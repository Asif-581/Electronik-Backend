import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllproducts,
  getSingleProduct,
  updateProduct,
} from "../../controllers/products/productController";
const router = Router();

router.get("", getAllproducts);
router.post("", createProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
