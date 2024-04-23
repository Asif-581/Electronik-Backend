"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signInController_1 = require("../../controllers/user/signInController");
const router = (0, express_1.Router)();
router.post("/", signInController_1.userSignIn);
exports.default = router;
