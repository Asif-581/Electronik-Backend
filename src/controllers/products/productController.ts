
import prisma from "../../config/db";
import { Request, Response } from "express";

const getSingleProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
      include: {
        categories: {
          select: {
            name: true,
            id:true
          },
        },
        companies: {
          select: {
            company_name: true,
            id:true
          },
        }
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


const getAllproducts = async (req: Request, res: Response) => {
  const { category_id, company_id, sort, page, limit, featured,min,max } = req.query;

  try {
    let queryObject: any = {};

    if (category_id) {
      queryObject.category_id = category_id as string;
    }

    if (company_id) {
      queryObject.company_id = company_id as string;
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

    

    let orderBy: any = {};
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
        orderBy = { created_at:"desc"};
    }

    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(limit) || 12;
    const maxLimit = 50; 

    // Ensure limit doesn't exceed maxLimit
    const effectiveLimit = Math.min(itemsPerPage, maxLimit);

    // Calculate offset based on page and limit
    const offset = (pageNumber - 1) * effectiveLimit;

    const products = await prisma.products.findMany({
      where: queryObject,
      include: {
        categories: {
          select: {
            name: true,
            id:true
          },
        },
        companies: {
          select: {
            company_name: true,
            id:true
          },
        },
      },
      orderBy: {
        ...orderBy
      },
      skip: offset,
      take: effectiveLimit,
    });

    const newProducts = products.map((product) => ({
      ...product,
      category: product?.categories?.name,
      company: product?.companies?.company_name,
    }));

    return res.status(200).json(newProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.products.delete({
      where: {
        id: `${req.params.id}`,
      },
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    stock,
    price,
    image,
    category,
    company,
    colors,
    featured,
  } = req.body;
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
    const product = await prisma.products.create({
      data: products,
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    stock,
    price,
    image,
    category,
    company,
    colors,
    featured,
  } = req.body;

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
    const updatedProduct = await prisma.products.update({
      where: {
        id: `${req.params.id}`,
      },
      data: products,
    });
    return res.status(200).json(updatedProduct);
  } catch (error: any) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ error: "Failed to update product" });
  }
};
export {
  getSingleProduct,
  getAllproducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
