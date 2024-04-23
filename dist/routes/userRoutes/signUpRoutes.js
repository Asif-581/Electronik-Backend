"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUpController_1 = require("../../controllers/user/signUpController");
const router = (0, express_1.Router)();
router.post("/", signUpController_1.userSignUp);
exports.default = router;
