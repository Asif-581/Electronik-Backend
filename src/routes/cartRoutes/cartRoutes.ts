import { Router } from "express";
import { addToCart, deleteCart, deleteCartItem, getCartCount, getCartItems, isProductExistInCart, updateCartQuantity } from "../../controllers/cart/cartController";
const router = Router();

router.post("/", addToCart);
router.get('/:id', getCartItems);
router.delete('/:id', deleteCartItem);
router.delete("/user/:id", deleteCart);
router.patch('/:id', updateCartQuantity)
router.get("/user/:id/count", getCartCount);
router.get("/", isProductExistInCart);


export default router;
