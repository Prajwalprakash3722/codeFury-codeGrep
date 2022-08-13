import express from "express";
import cors from "cors";
import router from "./routes";
import prisma from "./lib/Prisma";
import cookie from 'cookie-parser';

// import { Server } from "socket.io";
// import http from "http";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env") });
const main = async () => {
  const app = express();
  // const server = http.createServer(app);
  app.use(express.json());
  app.use(cookie());
  const port = 5000 || process.env.PORT;
  app.use(cors());
  app.use(router);
  app.get("/", (_req, res) => {
    res.send({
      ok: true,
      message: `Hello from the Server`
    });
  });

  app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
  });
};

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
