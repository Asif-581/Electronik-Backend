import prisma from "../../config/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

const userLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.json({
      data: [],
      message: "logout successfully!",
      error: false,
      success: true,
    });
  } catch (error) {}
};
export { userLogout };
