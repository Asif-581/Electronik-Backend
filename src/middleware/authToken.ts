const jwt = require("jsonwebtoken");

import { Request as ExpressRequest, Response, NextFunction } from "express";

interface DecodedUser {
  id: string;
  email: string;
}

interface CustomRequest extends ExpressRequest {
  user?: DecodedUser;
}

const authToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY
    ) as DecodedUser;
    req.user = decoded;

    next();
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};

export { authToken, DecodedUser };
