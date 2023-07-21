import { useState } from "react";
import "./multi.css";

export const Multi = () => {

  const [showJoin, setJoin] = useState(false);
  const [gameType, setGameType] = useState("public"); 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Game Type:", gameType);
    const time = new Date();
    const username = localStorage.getItem("username");
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
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </div>
        <div>
          <h1>Join a game</h1>
          <button className="btn btn-primary" >Join</button>
        </div>
      </div>
    </div>
  );
};
