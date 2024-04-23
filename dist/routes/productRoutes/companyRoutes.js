"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyController_1 = require("../../controllers/products/companyController");
const router = (0, express_1.Router)();
router.get("/", companyController_1.getCompanies);
exports.default = router;
