"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userDetailsController_1 = require("../../controllers/user/userDetailsController");
const authToken_1 = require("../../middleware/authToken");
const router = (0, express_1.Router)();
router.get("/", authToken_1.authToken, userDetailsController_1.userDetails);
exports.default = router;
