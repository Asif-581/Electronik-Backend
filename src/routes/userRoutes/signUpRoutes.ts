import { Router } from "express";
import { userSignUp } from "../../controllers/user/signUpController";
const router = Router();

router.post("/", userSignUp);

export default router;
