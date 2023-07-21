import { useState } from "react";
import "./multi.css";
import { useNavigate } from "react-router-dom";
import socket from "../socket.js";

export const Multi = () => {
  const [showJoin, setJoin] = useState(false);
  const [gameType, setGameType] = useState("public");
  const [inpId, setInpId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Game Type:", gameType);
    const username = localStorage.getItem("username");
    socket.emit("createGame", { username, gameType });
    socket.on("gameCreated", (data) => {
      console.log(data.roomid);
      navigate(`/lobby/${data.roomid}`);
    });
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    console.log(inpId);
    const username = localStorage.getItem("username");
    socket.emit("joingame", { username, inpId });
    socket.on("Success", () => {
      navigate(`/lobby/${inpId}`);
    });
    socket.on("LobbyFull", () => {
      alert("Lobby is full !!");
    });
    socket.on("Invalid", () => {
      alert("Invalid Room Id");
    });
  };

  const handleRandomjoin = async () => {
    const username = localStorage.getItem("username");
    socket.emit("randomjoin", { username });
    socket.on("success", (data) => {
      console.log(data.roomid, "randomjoin");
      navigate(`/lobby/${data.roomid}`);
    });
  };
  return (
    <div className="multi-container">
      <div className="close-button">
        <button className="go-back-button">
          <span className="X" />
          <span className="Y" />
          <div className="close">Close</div>
        </button>
      </div>
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
          <form onSubmit={handleJoin}>
            <h1>Join a game</h1>
            <button className="btn btn-primary" type="submit">
              Join
            </button>
            <input
              type="text"
              onChange={(e) => setInpId(e.target.value)}
              value={inpId}
            />
          </form>
        </div>
        <button className="btn btn-primary" onClick={handleRandomjoin}>
          Random Join
        </button>
      </div>
    </div>
  );
};
