import generator from "generate-password";
import { generateTextbackend } from "./helper/generateTextbackend.js";
import gameModel from "./model/gameModel.js";
import userModel from "./model/userModel.js";
export const Operate = (io) => {

    io.on("connection", (socket) => {
        console.log(`user connected: ${socket.id}`);
        socket.on("createGame", async(data) => {
            const text = await generateTextbackend();
            const time = new Date();
            let roomid = generator.generate({length:10, numbers:true});

            const user = await new userModel({
                name: data.username,
                roomid,
            }).save();

            const game = await new gameModel({
                mode: (data.gameType === "public" ? 0 : 1),
                roomid,
                players: [{
                    playerid: data.username,
                    wpm:0,
                    accuracy:0,
                }],
                text,
                time,
                gamelevel: 1,
            }).save();

            const response = {
                message: "Game created successfully",
                roomid,
            };
            socket.emit("gameCreated", response);
        });
    });
};

export default Operate;