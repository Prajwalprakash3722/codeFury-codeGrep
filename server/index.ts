import express from "express";
import cors from "cors";
import router from "./routes";
import prisma from "./lib/Prisma";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import dbConnect from "./models/dbConnect";
import { getAllJobs, addJob } from "./models/jobCRUD";
dbConnect();

dotenv.config({ path: path.resolve(__dirname, ".env") });
const main = async () => {
  const app = express();
  const server = http.createServer(app);
  app.use(express.json());
  const port = 5000 || process.env.PORT;
  const io = new Server(server, {
    cors: {
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin"
      ],
      origin: "*"
    }
  });

  io.on("connection", async (socket) => {
    socket.on("join_room", async (data) => {
      socket.join(JSON.parse(data).room);
      socket.emit("joined_room", data);
    });
    socket.on("leave_room", async (data) => {
      data = JSON.parse(data);
    });
    socket.on("send_message", async (data) => {
      socket.broadcast.to(JSON.parse(data).room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
      socket.disconnect();
    });
  });

  app.use(cors());
  app.use(router);
  app.get("/", (_req, res) => {
    res.send({
      ok: true,
      message: `Hello from the Server ${process.cpuUsage()}`
    });
  });

  



  server.listen(3001, function () {
    console.log("listening on *:3001");
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
