// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// const dbUrl = process.env.DATABASE_URL!
// export const sequelize = new Sequelize(dbUrl, {
//     dialect: 'postgres'
// });

// const fs = require("fs");
// const pg = require("pg");

// const config = {
//   user: "USER",
//   password: "PASSWORD",
//   host: "HOST",
//   port: "PORT",
//   database: "DATABASE",
//   ssl: {
//     rejectUnauthorized: true,
//     ca: fs.readFileSync("./ca.pem").toString(),
//   },
// };

// const client = new pg.Client(config);
// client.connect(function (err) {
//   if (err) throw err;
//   client.query("SELECT VERSION()", [], function (err, result) {
//     if (err) throw err;

//     console.log(result.rows[0]);
//     client.end(function (err) {
//       if (err) throw err;
//     });
//   });
// });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

export default prisma;
