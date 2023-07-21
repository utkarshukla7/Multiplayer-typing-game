import { useState } from "react";
import "./multi.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const socket = io.connect("http://localhost:5000");

export const Multi = () => {
  const [joinRoomid, setJoinRoomid] = useState("");
  const [gameType, setGameType] = useState("public");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Game Type:", gameType);
    const username = localStorage.getItem("username");
    socket.emit("createGame", { username, gameType });
    await socket.on("gameCreated", (data) => {
      console.log(data.message);
      console.log(data.roomid);
      navigate(`/lobby/${data.roomid}`);
    });
  };
  const handleIDchange = (e) => {
    setJoinRoomid(e.target.value);
  };
  const handleJoinWithId = () => {
    socket.emit("joingame", { joinRoomid });
  };
  const handleJoin = () => {
    console.log("hi");
  };
  return (
    <div className="multi-container">
      <div className="joining-div">
        <div>
          <h2>Create a Game</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="radio"
                value="public"
                checked={gameType === "public"}
                onChange={() => setGameType("public")}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                value="private"
                checked={gameType === "private"}
                onChange={() => setGameType("private")}
              />
              Private
            </label>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </form>
        </div>
        <div>
          <h1>Join a game</h1>
          <div>
            <input
              value={joinRoomid}
              onChange={handleIDchange}
              placeholder="Enter room ID"
            ></input>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleJoinWithId}
            >
              Join
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleJoin}
          >
            Join random lobby
          </button>
        </div>
      </div>
    </div>
  );
};
