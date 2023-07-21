import generator from "generate-password";
import { generateTextbackend } from "./helper/generateTextbackend.js";
import gameModel from "./model/gameModel.js";
import userModel from "./model/userModel.js";
export const Operate = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    socket.on("createGame", async (data) => {
      const text = await generateTextbackend();
      const time = new Date();
      let roomid = generator.generate({ length: 10, numbers: true });
    });
  });
};

export default Operate;
