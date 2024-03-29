import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import express from "express";
import http from "http";
import connectToMongo from "./db";
import groupRoutes from "./routes/GroupRoutes";
import userRoutes from "./routes/UserRoutes";
import boardRoutes from "./routes/BoardRoutes";
import { Request, Response } from "express";
env.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/group/", groupRoutes);
app.use("/api/v1/board/", boardRoutes);
app.use("/", (req,res) => res.json({"message" : "Api Working"}))

const server = http.createServer(app);

connectToMongo();

server.listen(8080, () => {
  console.log("Server running");
});

export default app;
