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
  const handleMultiClose = () => {
    navigate("/single");
  };
  return (
    <div className="multi-container">
      <div className="close-button">
        <button className="go-back-button" onClick={handleMultiClose}>
          <span className="X" />
          <span className="Y" />
          <div className="close">Close</div>
        </button>
      </div>
      <div className="joining-div">
        <div className="create-lobby">
          <form onSubmit={handleSubmit} className="create-lobby-form">
            <button className="create-lobby-btn" type="submit">
              Create Lobby
            </button>
            <div className="private-checker">
              <label className="private-txt">keep it private?</label>
              <label className="checkBox">
                <input
                  type="checkbox"
                  id="ch1"
                  onChange={() => setGameType("private")}
                />
                <div className="transition" />
              </label>
            </div>
          </form>
        </div>
        <div className="join-lobby">
          <form onSubmit={handleJoin}>
            <input
              placeholder="Lobby ID"
              type="text"
              className="lobby-id-input"
              onChange={(e) => setInpId(e.target.value)}
              value={inpId}
            />
            <button className="lobby-id-btn" type="submit">
              Join
            </button>
          </form>
        </div>
        <button className="random-join-btn" onClick={handleRandomjoin}>
          Join Public Lobby
        </button>
      </div>
    </div>
  );
};
