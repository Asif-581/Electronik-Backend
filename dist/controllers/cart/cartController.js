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
exports.isProductExistInCart = exports.getCartCount = exports.updateCartQuantity = exports.deleteCart = exports.deleteCartItem = exports.getCartItems = exports.addToCart = void 0;
const db_1 = __importDefault(require("../../config/db"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItem = Object.assign({}, req.body);
        const cart = yield db_1.default.cart.create({
            data: cartItem,
        });
        res.status(201).json({
            success: true,
            data: cart,
            error: false,
            message: "Item added to cart successfully!",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message,
        });
    }
});
exports.addToCart = addToCart;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cartItems = yield db_1.default.cart.findMany({
            where: {
                user_id: `${id}`,
                order_id: null
            },
            include: {
                products: {
                    select: {
                        name: true,
                        image: true,
                        price: true,
                        stock: true
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
        res.status(200).json({
            success: true,
            data: cartItems,
            error: false,
            message: "Cart items fetched successfully!",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message,
        });
    }
});
exports.getCartItems = getCartItems;
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const cart = yield db_1.default.cart.delete({
            where: {
                cart_id: `${id}`,
            },
        });
        res.status(200).json({
            success: true,
            error: false,
            message: "Item deleted successfully!", // Adjusted success message
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message, // Return error message directly
        });
    }
});
exports.deleteCartItem = deleteCartItem;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.cart.deleteMany({
            where: {
                user_id: `${id}`,
            },
        });
        res.status(200).json({
            success: true,
            error: false,
            message: "cart deleted successfully!", // Adjusted success message
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message, // Return error message directly
        });
    }
});
exports.deleteCart = deleteCart;
const updateCartQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { product_id, quantity } = req.body;
    console.log(id);
    try {
        const updatedCart = yield db_1.default.cart.update({
            where: {
                cart_id: `${id}`,
            },
            data: {
                product_id: `${product_id}`,
                quantity: parseInt(`${quantity}`),
            },
        });
        res.status(200).json({
            data: updatedCart,
            success: true,
            error: false,
            message: "cart updated successfully!", // Adjusted success message
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message, // Return error message directly
        });
    }
});
exports.updateCartQuantity = updateCartQuantity;
const getCartCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cartLength = yield db_1.default.cart.count({
            where: {
                user_id: `${id}`,
                order_id: null
            },
        });
        res.status(200).json({
            count: cartLength,
            success: true,
            error: false,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message, // Return error message directly
        });
    }
});
exports.getCartCount = getCartCount;
const isProductExistInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, user_id } = req.query;
        return res.status(200).json({
            data: yield db_1.default.cart.count({
                where: {
                    user_id: `${user_id}`,
                    product_id: `${product_id}`
                }
            }),
            success: true,
            error: false,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message, // Return error message directly
        });
    }
});
exports.isProductExistInCart = isProductExistInCart;
