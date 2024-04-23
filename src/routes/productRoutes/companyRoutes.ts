import { Router } from "express";
import { getCompanies } from "../../controllers/products/companyController";
const router = Router();

router.get("/", getCompanies);

export default router;
