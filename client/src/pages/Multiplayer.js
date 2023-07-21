import Layout from "../layout/layout";
import socket from "../socket.js";

export const Multiplayer = () => {
    const lobbyid = window.location.href.split('/').at(-1);
    console.log(lobbyid);
    const handleStart = async(event)=>{
        event.preventDefault();
        socket.emit("startTypingTest",lobbyid);
    }; 

    return (
        <Layout>
        <h1>Multiplayer</h1>
        <p>{lobbyid}</p>
        <button className="start-btn" type="submit" onClick={handleStart}> Start </button>
        </Layout>
    );
};
export default Multiplayer;