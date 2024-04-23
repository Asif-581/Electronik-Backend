import { Router } from "express";
import { userDetails } from "../../controllers/user/userDetailsController";
import { authToken } from "../../middleware/authToken";
const router = Router();

router.get("/", authToken, userDetails);

export default router;
