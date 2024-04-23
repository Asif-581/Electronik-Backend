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
exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getAllproducts = exports.getSingleProduct = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield db_1.default.products.findUnique({
            where: {
                id: productId,
            },
            include: {
                categories: {
                    select: {
                        name: true,
                        id: true
                    },
                },
                companies: {
                    select: {
                        company_name: true,
                        id: true
                    },
                }
            },
        });
        return res.status(200).json(product);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getSingleProduct = getSingleProduct;
const getAllproducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category_id, company_id, sort, page, limit, featured, min, max } = req.query;
    try {
        let queryObject = {};
        if (category_id) {
            queryObject.category_id = category_id;
        }
        if (company_id) {
            queryObject.company_id = company_id;
        }
        if (featured === "true") {
            queryObject.featured = true;
        }
        if (min && max) {
            queryObject.price = {
                gte: Number(min),
                lte: Number(max),
            };
            // queryObject.gte = Number(min)
            // queryObject.lte = Number(max)
        }
        let orderBy = {};
        switch (sort) {
            case "price-desc":
                orderBy = { price: "desc" };
                break;
            case "price-asc":
                orderBy = { price: "asc" };
                break;
            case "nameAZ-asc":
                orderBy = { name: "asc" };
                break;
            case "nameZA-desc":
                orderBy = { name: "desc" };
                break;
            default:
                orderBy = { created_at: "desc" };
        }
        const pageNumber = Number(page) || 1;
        const itemsPerPage = Number(limit) || 12;
        const maxLimit = 50;
        // Ensure limit doesn't exceed maxLimit
        const effectiveLimit = Math.min(itemsPerPage, maxLimit);
        // Calculate offset based on page and limit
        const offset = (pageNumber - 1) * effectiveLimit;
        const products = yield db_1.default.products.findMany({
            where: queryObject,
            include: {
                categories: {
                    select: {
                        name: true,
                        id: true
                    },
                },
                companies: {
                    select: {
                        company_name: true,
                        id: true
                    },
                },
            },
            orderBy: Object.assign({}, orderBy),
            skip: offset,
            take: effectiveLimit,
        });
        const newProducts = products.map((product) => {
            var _a, _b;
            return (Object.assign(Object.assign({}, product), { category: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.name, company: (_b = product === null || product === void 0 ? void 0 : product.companies) === null || _b === void 0 ? void 0 : _b.company_name }));
        });
        return res.status(200).json(newProducts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});
exports.getAllproducts = getAllproducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield db_1.default.products.delete({
            where: {
                id: `${req.params.id}`,
            },
        });
        return res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteProduct = deleteProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, stock, price, image, category, company, colors, featured, } = req.body;
    console.log(req.body);
    const products = {
        name: name,
        description: description,
        stock: stock,
        price: price,
        image: image,
        category_id: category,
        company_id: company,
        colors: colors,
        featured: featured,
    };
    try {
        const product = yield db_1.default.products.create({
            data: products,
        });
        return res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, stock, price, image, category, company, colors, featured, } = req.body;
    const products = {
        name: name,
        description: description,
        stock: stock,
        price: price,
        image: image,
        category_id: category,
        company_id: company,
        colors: colors,
        featured: featured,
    };
    console.log(products);
    try {
        const updatedProduct = yield db_1.default.products.update({
            where: {
                id: `${req.params.id}`,
            },
            data: products,
        });
        return res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error.message);
        return res.status(500).json({ error: "Failed to update product" });
    }
});
exports.updateProduct = updateProduct;
