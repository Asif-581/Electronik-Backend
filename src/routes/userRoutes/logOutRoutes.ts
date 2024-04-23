import { Router } from "express";
import { userLogout } from "../../controllers/user/logOutController";
const router = Router();

router.get("/", userLogout);
export default router;
