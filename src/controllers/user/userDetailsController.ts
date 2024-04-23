import prisma from "../../config/db";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

const userDetails = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Token not provided");
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.id;

    // Fetch user details from the database
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (err:any) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};



export { userDetails };
