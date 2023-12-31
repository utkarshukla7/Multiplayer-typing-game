import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import utilityRoute from "./routes/utilityRoute.js";
import http from 'http'
import mongoose from "mongoose";
import connectdb from "./db.js"
import { Server } from "socket.io";
import Operate from "./socket.js";

dotenv.config();
//express app
const app = express();

connectdb();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api/utility", utilityRoute);

const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

Operate(io);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`RUNNING ${port}`);
});
