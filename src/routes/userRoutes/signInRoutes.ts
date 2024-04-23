import { Router } from "express";
import { userSignIn } from "../../controllers/user/signInController";
const router = Router();

router.post("/", userSignIn);
export default router;
