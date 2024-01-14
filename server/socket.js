import generator from "generate-password";
import { generateTextbackend } from "./helper/generateTextbackend.js";
import gameModel from "./model/gameModel.js";
import userModel from "./model/userModel.js";


const lobbies = {};
const public_lobbies = {};
const users = {};

export const Operate = (io) => {

    io.on("connection", (socket) => {
        
        socket.on("entered",(data)=>{
          users[socket.id] = {username: data.username, roomid: "", ongoing: false};
        })
        // console.log(`user connected: ${socket.id}`);

        socket.on("createGame", async(data) => {
            const text = await generateTextbackend();
            const time = new Date();
            let roomid = generator.generate({length:10, numbers:true});
            while(lobbies.hasOwnProperty(roomid)){
                roomid = generator.generate({length:10, numbers:true});
            }
            lobbies[roomid] = {users : [data.username], text, time};
            users[socket.id] ={
              ...users[socket.id],
              roomid: roomid,
            }
            socket.join(roomid);
            socket.emit('gameCreated',{roomid});
            io.to(roomid).emit("userUpdate",lobbies[roomid]);
        });

        socket.on('joingame', (data) => {
            if(lobbies.hasOwnProperty(data.inpId)){
              if (lobbies[data.inpId].users.length >= 5) {
                socket.emit('LobbyFull');
              }
              else{
                users[socket.id] ={
                  ...users[socket.id],
                  roomid: data.inpId,
                }
                socket.join(data.inpId);
                lobbies[data.inpId].users.push(data.username);
                io.to(data.inpId).emit('usersUpdate', lobbies[data.inpId]);
                socket.emit("Success");
              }
            }
            else if(public_lobbies.hasOwnProperty(data.inpId)){
              if (public_lobbies[data.inpId].users.length >= 5) {
                socket.emit('LobbyFull');
              }
              else{
                users[socket.id] ={
                  ...users[socket.id],
                  roomid: data.inpId,
                }
                socket.join(data.inpId);
                public_lobbies[data.inpId].users.push(data.username);
                io.to(data.inpId).emit('usersUpdate', public_lobbies[data.inpId]);
                socket.emit("Success");
              }
            }
            else{
              socket.emit("Invalid");
            }
          });
          socket.on("restart", async(lobbyid)=>{
            if(lobbies.hasOwnProperty(lobbyid)){
              lobbies[lobbyid].text = await generateTextbackend();
              lobbies[lobbyid].ongoing = true;
              socket.emit("successfulrestart");
            }
            else if(public_lobbies.hasOwnProperty(lobbyid)){
              public_lobbies[lobbyid].text = await generateTextbackend();
              public_lobbies[lobbyid].ongoing = true;
              socket.emit("successfulrestart");
            }
            else{
              socket.emit("Invalid");
            }
          });
          
          socket.on('randomjoin', async(data) => {
            let roomid = "";
            const keys = Object.keys(public_lobbies);
            for(let i of keys){
                if(public_lobbies[i].users.length >= 5) continue;
                if(lobbies.hasOwnProperty(i)) continue;
                roomid = i;
                break;
            }
            if(roomid === "") {
                const text = await generateTextbackend();
                const time = new Date();
                let roomid = generator.generate({length:10, numbers:true});
                while(lobbies.hasOwnProperty(roomid)){
                  roomid = generator.generate({length:10, numbers:true});
                }
                public_lobbies[roomid] = {users : [data.username], time, text};
                users[socket.id] = {
                  ...users[socket.id],
                  roomid: roomid,
                }
                socket.join(roomid);
                io.to(roomid).emit("userUpdate",public_lobbies[roomid]);
                socket.emit("success",{roomid});
            }
            else{
                public_lobbies[roomid].users.push(data.username);
                users[socket.id] ={
                  ...users[socket.id],
                  roomid: roomid,
                }
                socket.join(roomid);
                io.to(roomid).emit('usersUpdate', public_lobbies[roomid]);
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
            if (lobby && lobby.users.length >= 1) {
              let seconds = 10;
              const interval = setInterval(() => {
                seconds--;
                io.to(lobbyid).emit('timerUpdate', seconds);
                if (seconds <= 0) {
                  clearInterval(interval);
                  io.to(lobbyid).emit('testStarted', lobby.text);
                  if(lobbies.hasOwnProperty(lobbyid)){
                    lobbies[lobbyid].ongoing = true;
                  }
                  else if(public_lobbies.hasOwnProperty(lobbyid)){
                    public_lobbies[lobbyid].ongoing = true;
                  }
                }
              }, 1000);
            } else {
              socket.emit('notEnoughUsers');
            }
          });

          // update code for level selection
          socket.on("progressUpdate", (data) => {
            let speed = data.timer === 0 ? 0:((((data.ind / (5)) * 60) / (data.timer)).toFixed(0));
            let accuracy = data.totalchar === 1 ? 100:(((data.ind / (data.totalchar - 1)) * 100).toFixed(0));
            let total = 0;
            if(lobbies.hasOwnProperty(data.roomid)){
              total = lobbies[data.roomid].text.length;
            }
            else if(public_lobbies.hasOwnProperty(data.roomid)){
              total = public_lobbies[data.roomid].text.length;
            }
            else{
              total = 0;
            }
            io.to(data.roomid).emit("progressResponse", {progress:data.ind, username: data.username});
            socket.emit("userprogressresponse", {speed, accuracy});
          });
          // complete this code
          socket.on("completedtest",(data)=>{
            console.log("user completed test or time ended");
              io.to(data.lobbyid).emit("completedtestresponse", {username: data.username, speed: data.speed, accuracy: data.accuracy, time:data.time});
          });

          socket.on("disconnect", ()=>{
            let player = users[socket.id];
            if(player === undefined) {
              delete users[socket.id];
              return;
            }
            if(lobbies.hasOwnProperty(player["roomid"])){
              lobbies[player["roomid"]].users = lobbies[player["roomid"]].users.filter((user)=>user!==player.username);
              if(lobbies[player["roomid"]].users.length === 0){
                delete lobbies[player["roomid"]];
              }
            }
            if(public_lobbies.hasOwnProperty(player["roomid"])){
              public_lobbies[player["roomid"]].users = public_lobbies[player["roomid"]].users.filter((user)=>user!==player.username);
              if(public_lobbies[player["roomid"]].users.length === 0){
                delete public_lobbies[player["roomid"]];
              }
            }
            delete users[socket.id];
          });
        
    });
};


export default Operate;