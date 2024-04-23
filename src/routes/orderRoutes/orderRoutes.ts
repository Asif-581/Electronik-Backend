import { Router } from "express";
import { createOrder,getAllOrders } from "../../controllers/order/orderController";
const router = Router();

router.post("/", createOrder);
router.get('/:userId',getAllOrders)

export default router;
