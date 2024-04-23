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
exports.getAllOrders = exports.createOrder = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Create the order
            const order = yield prisma.orders.create({
                data: {
                    user_id: req.body.user_id,
                    address_info: req.body.address_info,
                    payment_id: req.body.payment_id,
                    email: req.body.email,
                    status: "CREATED",
                },
            });
            // Extract the ID of the created order
            const orderId = order.id;
            // Fetch the cart items and update them with the order ID
            const cart = yield prisma.cart.findMany({
                where: {
                    cart_id: {
                        in: req.body.cart_ids,
                    },
                },
                include: {
                    products: {
                        select: {
                            id: true,
                            stock: true,
                        },
                    },
                },
            });
            const updateCartPromises = cart.map((c) => __awaiter(void 0, void 0, void 0, function* () {
                yield prisma.cart.update({
                    where: { cart_id: c.cart_id },
                    data: { order_id: orderId },
                });
                // Update the product stock
                const updatedStock = c.products.stock - c.quantity;
                yield prisma.products.update({
                    where: { id: c.products.id },
                    data: { stock: updatedStock },
                });
            }));
            yield Promise.all(updateCartPromises);
        }));
        res.status(201).json({
            error: false,
            success: true,
            message: "Order created successfully and cart updated.",
        });
    }
    catch (err) {
        res.status(400).json({
            message: "An error occurred while creating order: " + err.message,
            error: true,
            success: false,
        });
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield db_1.default.orders.findMany({
            where: {
                user_id: `${req.params.userId}`,
            },
            include: {
                cart: {
                    include: {
                        products: {
                            select: {
                                name: true,
                                image: true,
                                colors: true,
                                price: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                created_at: "desc",
            },
        });
        res.status(200).json({
            data: order,
            error: false,
            success: true,
            message: "order received sucessfully",
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            message: err,
            error: true,
            success: true,
        });
    }
});
exports.getAllOrders = getAllOrders;
