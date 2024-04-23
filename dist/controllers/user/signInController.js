"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignIn = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = require("jsonwebtoken");
const userSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Authenticate user
        const user = yield db_1.default.users.findUnique({
            where: {
                email: `${email}`,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!checkPassword) {
            throw new Error("Invalid password");
        }
        // Generate JWT token
        const tokenData = {
            id: user.id,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "8h",
        });
        // Send token to the client
        res.json({
            message: "Login successful",
            data: { token, user },
            success: true,
            error: false,
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
});
exports.userSignIn = userSignIn;
