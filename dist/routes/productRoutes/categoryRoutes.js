"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../../controllers/products/categoryController");
const router = (0, express_1.Router)();
router.get("/", categoryController_1.getCategories);
exports.default = router;
