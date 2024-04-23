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
exports.userSignUp = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        let user = yield db_1.default.users.findUnique({
            where: {
                email: `${email}`,
            },
        });
        if (user) {
            throw new Error("User Already exist");
        }
        if (!name) {
            throw new Error("Please enter your name");
        }
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please enter your password");
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashPassword = yield bcryptjs_1.default.hash(password, salt);
        const payload = Object.assign(Object.assign({}, req.body), { password: hashPassword, role: "user" });
        user = yield db_1.default.users.create({
            data: payload,
        });
        res.status(201).json({
            data: user,
            success: true,
            error: false,
            message: "User created successfully!",
        });
    }
    catch (err) {
        // Handle errors from Prisma or bcrypt
        console.error("Error:", err);
        res.json({
            message: err.message,
            error: true,
            success: false,
        });
    }
});
exports.userSignUp = userSignUp;
