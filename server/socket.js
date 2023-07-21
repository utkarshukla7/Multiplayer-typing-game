import generator from "generate-password";
import { generateTextbackend } from "./helper/generateTextbackend.js";
import gameModel from "./model/gameModel.js";
import userModel from "./model/userModel.js";


const lobbies = {};
const public_lobbies = {};

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
            lobbies[roomid] = {users : [data.username], text, time};
            socket.join(roomid);
            socket.emit('gameCreated',{roomid});
            // io.to(roomid).emit("userUpdate",lobbies[roomid]);
        });

        socket.on('joingame', (data) => {
            // delete empty lobbies
            if (!lobbies[data.inpId]) {
                socket.emit("Invalid");
            }
        
            if (lobbies[data.inpId].users.length >= 5) {
              socket.emit('LobbyFull');
              return;
            }
        
            socket.join(data.inpId);
            lobbies[data.inpId].users.push(data.username);
            io.to(data.inpId).emit('usersUpdate', lobbies[data.inpId].users);
            socket.emit("Success");
          });

          socket.on('randomjoin', async(data) => {
            console.log(socket.id, "socket id");
            let roomid = "";
            const keys = Object.keys(public_lobbies);
            console.log(keys);
            for(let i of keys){
                if(public_lobbies[i].users.length >= 5) continue;
                if(lobbies.hasOwnProperty(i)) continue;
                roomid = i;
                break;
            }
            console.log(roomid);
            if(roomid === "") {
                const text = await generateTextbackend();
                const time = new Date();
                let roomid = generator.generate({length:10, numbers:true});
                while(lobbies.hasOwnProperty(roomid)){
                  roomid = generator.generate({length:10, numbers:true});
                }
                public_lobbies[roomid] = {users : [data.username], time, text};
                socket.join(roomid);
                socket.emit("success",{roomid});
            }
            else{
                public_lobbies[roomid].users.push(data.username);
                socket.join(roomid);
                socket.emit("success",{roomid});
            }
        });

        socket.on("leaveLobby", (data) => {
            if (lobbies[data.roomid]) {
              const index = lobbies[data.roomid].users.indexOf(data.username);
              if (index !== -1) {
                lobbies[data.roomid].users.splice(index, 1);
              }
              
              if (lobbies[data.roomid].users.length === 0) {
                delete lobbies[data.roomid];
              } else {
                io.to(data.roomid).emit("usersUpdate", lobbies[data.roomid]);
              }
            }
        });

        socket.on("leavepublicLobby", (data) => {
            if (public_lobbies[data.roomid]) {
              const index = public_lobbies[data.roomid].users.indexOf(data.username);
              if (index !== -1) {
                public_lobbies[data.roomid].users.splice(index, 1);
              }
              
              if (public_lobbies[data.roomid].users.length === 0) {
                delete public_lobbies[data.roomid];
              } else {
                io.to(data.roomid).emit("usersUpdate", public_lobbies[data.roomid]);
              }
            }
        });

          socket.on("startTypingTest", (lobbyid) => {
            const lobby = (lobbies.hasOwnProperty(lobbyid) ? lobbies[lobbyid]: public_lobbies[lobbyid]);
            console.log(lobbyid);
            console.log(lobby);
            if (lobby && lobby.users.length >= 1) {
              console.log("here");
              let seconds = 5;
              const interval = setInterval(() => {
                seconds--;
                console.log(seconds);
                io.to(lobbyid).emit('timerUpdate', seconds);
                if (seconds <= 0) {
                  clearInterval(interval);
                  io.to(lobbyid).emit('testStarted', lobby.text);
                }
              }, 1000);
            } else {
              socket.emit('notEnoughUsers');
            }
          });

        
    });
};


export default Operate;