import prisma from "../../config/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const userSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    let user = await prisma.users.findUnique({
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

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      ...req.body,
      password: hashPassword,
      role: "user",
    };

    user = await prisma.users.create({
      data: payload,
    });

    res.status(201).json({
      data: user,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (err: any) {
    // Handle errors from Prisma or bcrypt
    console.error("Error:", err);
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};

export { userSignUp };
