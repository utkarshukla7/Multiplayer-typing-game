import generator from "generate-password";
import { generateTextbackend } from "./helper/generateTextbackend.js";
import gameModel from "./model/gameModel.js";
import userModel from "./model/userModel.js";


const lobbies = {};

export const Operate = (io) => {

    io.on("connection", (socket) => {

        console.log(`user connected: ${socket.id}`);

        socket.on("createGame", async(data) => {
            const text = await generateTextbackend();
            const time = new Date();
            let roomid = generator.generate({length:10, numbers:true});
            while(lobbies.hasOwnProperty(roomid)){
                roomid = generator.generate({length:10, numbers:true});
            }
            lobbies[roomid] = {users : [data.username]};
            socket.join(roomid);
            socket.emit('gameCreated',{roomid});
            // io.to(roomid).emit("userUpdate",lobbies[roomid]);
        });

        socket.on('joingame', (data) => {
            // delete empty lobbies
            if (!lobbies[data.inpId]) {
              lobbies[data.inpId] = { users: [] };
            }
        
            if (lobbies[data.inpId].users.length >= 5) {
              socket.emit('LobbyFull');
              return;
            }
        
            socket.join(data.inpId);
            lobbies[data.inpId].users.push(data.username);
        
            io.to(data.inpId).emit('usersUpdate', lobbies[data.inpId].users);
          });

        
    });
};

export default Operate;