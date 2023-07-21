import Layout from "../layout/layout";
import socket from "../socket.js";
import "./Multiplayer.css";

export const Multiplayer = () => {
    const lobbyid = window.location.href.split('/').at(-1);
    console.log(lobbyid);
    const handleStart = async(event)=>{
        event.preventDefault();
        socket.emit("startTypingTest",lobbyid);
    }; 

    return (
        <div className="whole-multiplayer">
            <h1>Multiplayer</h1>
            <p>{lobbyid}</p>
            <button className="start-btn" type="submit" onClick={handleStart}> Start </button>
        </div>
    );
};
export default Multiplayer;