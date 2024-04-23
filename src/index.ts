import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
const cookieParser = require("cookie-parser");
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  return res.send("welcome");
});

app.listen(port, () => {
  console.log("server started");
});
