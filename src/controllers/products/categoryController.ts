import prisma from "../../config/db";
import { Request, Response } from "express";

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { getCategories };
