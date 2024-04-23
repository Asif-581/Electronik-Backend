import prisma from "../../config/db";
import { Request, Response } from "express";

const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.companies.findMany();
    return res.status(200).json(companies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { getCompanies };
