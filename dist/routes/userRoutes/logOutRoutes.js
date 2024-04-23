"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logOutController_1 = require("../../controllers/user/logOutController");
const router = (0, express_1.Router)();
router.get("/", logOutController_1.userLogout);
exports.default = router;
