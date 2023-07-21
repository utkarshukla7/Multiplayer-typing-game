import Layout from "../layout/layout";
import socket from "../socket.js";
import { useEffect, useState } from "react";
import "./Multiplayer.css";

export const Multiplayer = () => {
    const lobbyid = window.location.href.split('/').at(-1);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [textArray, setTextArray] = useState([]);
    const [flag, setFlag] = useState(true);

    const handleStart = async(event)=>{
        event.preventDefault();
        socket.emit("startTypingTest",lobbyid);
    };


    const handlekeypress = (e) => {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          return;
        }
      }
      const handlePaste = (event) => {
        event.preventDefault();
      };

    socket.on('timerUpdate', (seconds) => {
        setTimerSeconds(seconds);
    });

    socket.on("testStarted", (text)=>{
        const tt = text.split("");
        setTextArray(tt);
    });
    
    console.log(timerSeconds);
    return (
        <div className="whole-multiplayer">
            <div className="timer">
                Timer: {timerSeconds} seconds
            </div>
            <p>{lobbyid}</p>
            <button className="start-btn" type="submit" onClick={handleStart}>Start</button>
            <div className="multiplayer-textbox">
                {flag?
                    textArray.map((item) => (
                        <span
                            style={{
                            color: "black",
                            }}
                            className="characters-solo"
                        >
                            {item}
                        </span>
                    )):<span>hello</span>
                }
            </div>
            <input
                // value={inputArray.join("")}
                // onChange={}
                className="input-box-multi"
                onKeyDown={handlekeypress}
                onPaste={handlePaste}
                oncontextmenu="return false;" 
                autocomplete="off"
                onClick={(e) => {
                    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
                }}
            ></input>
            <div className="speed-multi">Speed (Wpm)
            <div className="speed-value">
                {/* {count === 30 ? 0 : ((ind/5)*60/(30-count)).toFixed(0)} */}
                100%
            </div>
            </div>
            <div className="acc-multi">Accuracy
                        <div className="acc-value">
                        {/* {totalchar === 1 ? 0 :(((ind + 1)/(totalchar - 1)) * 100).toFixed(0)}% */}
                        1000%
                        </div>
            </div>
        </div>
    );
};
export default Multiplayer;