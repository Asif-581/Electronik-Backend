import prisma from "../../config/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

const userSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Authenticate user
    const user = await prisma.users.findUnique({
      where: {
        email: `${email}`,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

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
  } catch (err:any) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};

export { userSignIn };
