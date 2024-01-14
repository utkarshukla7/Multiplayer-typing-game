import socket from "../socket.js";
import { useEffect, useState, useRef } from "react";
import "./Multiplayer.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {ProgressBar} from './progressbar.js';

export const Multiplayer = () => {
    const navigate = useNavigate();
    const lobbyid = window.location.href.split('/').at(-1);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [ind, setInd] = useState(0);
    const [textArray, setTextArray] = useState([]);
    const [inputArray, setInputArray] = useState([]);
    const [flag, setFlag] = useState(false);
    const [arr, setArr] = useState([]);
    const [totalchar, setTotalchar] = useState(0);
    const [testend, setTestend] = useState(null);
    const username = localStorage.getItem("username");
    const underlinedElementRef = useRef(null);
    const [otherUsers, setOtherUsers] = useState({});
    const [timer, setTimer] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [first, setFirst] = useState(true);
    const [textToCopy, setTextToCopy] = useState("This is the text to be copied.");
    const [showstart, setShowstart] = useState(true);
    const [winners, setWinners] = useState([]);
    const [showresults, setShowresults] = useState(false);
    const [showresultbtn, setShowresultbtn] = useState(false);
    const textRef = useRef(null);

    const handleStart = async(event)=>{
        event.preventDefault();
        socket.emit("startTypingTest",lobbyid);
        setShowstart(false);
    };

    useEffect(() => {
        setTotalchar((prevkey) => prevkey + 1);
        const temp = [];
        let c = 0;
        let tempind = 0;
        const giveColor = (index) => {
            if (index === textArray.length - 1) {
                if (inputArray.length >= textArray.length) {
                    setTestend(false);
                    setShowresultbtn(true);
                }
            }
            if (inputArray.length === 0) return "black";
            if (textArray[index] === inputArray[index]) {
                c += 1;
                if (index === c - 1) {
                    setInd(index);
                    tempind = index;
                    return "green";
                }
            }
            if (index < inputArray.length) {
                return "red";
            }
            return "black";
        };
        for (let i = 0; i < textArray.length; i++) {
            temp.push({ color: giveColor(i), char: textArray[i], ind: i });
        }
        setArr(temp);
        socket.emit("progressUpdate", {ind:tempind, totalchar, timer, username, roomid:lobbyid });
    }, [inputArray]);

    useEffect(() => {
        if (underlinedElementRef.current) {
            underlinedElementRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [arr]);

    const handleInputChange = (e) => {
        setFirst(false);
        setInputArray(e.target.value.split(""));
    };


    const handlekeypress = (e) => {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          return;
        }
    }

    useEffect(() => {
        if(timer>=120) {
            setShowresultbtn(true);
        }
    },[timer]);

    useEffect(() => {
        if (showresults) {
          // Show the modal when stats becomes true
          const modalElement = document.getElementById("exampleModal");
          const modal = new window.bootstrap.Modal(modalElement);
          modal.show();
        }
      }, [showresults]);
    
    const handlePaste = (event) => {
        event.preventDefault();
    };

    socket.on('timerUpdate', (seconds) => {
        setShowstart(false);
        setTimerSeconds(seconds);
    });

    socket.on("testStarted", (text)=>{
        const tt = text.split("");
        setTextArray(tt);
        setTestend(true);
        setFlag(true);
    });

    socket.on("userprogressresponse", (data)=>{
        setAccuracy(data.accuracy);
        setSpeed(data.speed);
    });

    socket.on("successfulrestart", ()=>{
        setTestend(false);
        setTimer(0);
        setShowresultbtn(false);
        setOtherUsers({});
        setWinners([]);
        socket.emit("startTypingTest",lobbyid);
    });
    
    socket.on("completedtestresponse", (data)=>{
        let t = winners;
        let tt = [data.time, data.username, data.speed, data.accuracy]; 
        let cnt = 0;
        for(let i=0;i<t.length;i++) {
            if(t[i][1] === data.username) {
                cnt = 1;
            }
        }
        if(cnt === 0){
            t.push(tt);
            setWinners(t);
            console.log(tt);
        }
    });
    

    useEffect(() => {
        let interval;
        if (testend) {
            interval = setInterval(() => {
                setTimer((prevSeconds) => (prevSeconds >= 120 ? prevSeconds : prevSeconds + 1));
            }, 1000);
            if(timer >= 120) {
                console.log("sent request due to time end")
                socket.emit("completedtest", {username, speed, lobbyid, accuracy, time:timer});
            }
        }
        return () => clearInterval(interval);
    },[testend]);
    
    useEffect(() => {
        socket.on("progressResponse", (data) => {
            setOtherUsers({...otherUsers, [data.username]:data.progress});
        });
        
    },[timer]);

    if(showresultbtn) {
        socket.emit("completedtest", {username, speed, lobbyid, accuracy, time:timer});
    }
    const handlebacktolobby = () => {
        socket.emit("leavepublicLobby", {username, lobbyid});
        navigate("/multi");
    };

    const handleRestart = () => {
        socket.emit("restart", lobbyid);
        socket.on("Invalid",()=>{
            console.log("inside invalid");
            navigate("/multi");
        });
    };


    const handleCopyClick = () => {
        const tempTextarea = document.createElement("textarea");
        tempTextarea.value = lobbyid;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextarea);
    };
    
    const handleresults = () => {
        setShowresults(true);
    };

    const handleContinuePractice = () => {
        setShowresults(false);
        window.location.reload();
    };

    const getSortedWinners = () => {
        let temp = winners;
        temp.sort((a,b)=>a[0]-b[0]);
        console.log(temp,"temp");
        console.log(winners,"winners");
        return temp;
    };

    return (
        <div className="whole-multiplayer">
            <Button className = "copybtn" variant="" onClick={handleCopyClick}>{lobbyid}</Button>
            <span className="room-id">Room ID</span>
            <>{
                timerSeconds !== 0 && 
                <div className="remtime">
                    Starts in {timerSeconds} secs...
                </div>
            }
            </>
            <>
            {
                (!showstart) &&
                ( <div className="timer">
                    {timer}
                </div>)
            }
            </>
            {
                showstart &&
                (<Button className="btn btn-primary start-btn" variant = "success" onClick={handleStart}>Start</Button>)
            }
            <button className="btn btn-primary backtolobby-btn" onClick={handlebacktolobby}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>

            </button>
            <button className="btn btn-primary restart-btn"  onClick={handleRestart} ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg></button>
            <div className="multiplayer-textbox">
                {first?
                    textArray.map((item) => (
                        <span
                            style={{
                            color: "black",
                            }}
                            className="characters-solo"
                        >
                            {item}
                        </span>
                    )):arr.map((item) => (
                        <span
                          style={{
                            color: item.color,
                            textDecoration:
                              item.ind === inputArray.length ? "underline" : "none",
                          }}
                          className="characters-solo"
                          ref={
                            item.ind === inputArray.length || item.ind === 0
                              ? underlinedElementRef
                              : null
                          }
                        >
                          {item.char}
                        </span>
                    ))
                }
            </div>
            <input
                value={inputArray.join("")}
                onChange={handleInputChange}
                className="input-box-multi"
                onKeyDown={handlekeypress}
                onPaste={handlePaste}
                oncontextmenu="return false;" 
                autocomplete="off"
                onClick={(e) => {
                    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
                }}
            ></input>
            <div className="speed-multiple">Speed
            <div className="speed-value-multi">
                {speed}
            </div>
            </div>
            <div className="acc-multiple">Accuracy
                    <div className="acc-value-multi">
                    {accuracy}%
                    </div>
            </div>
            {
                showresultbtn && <Button onClick={handleresults} className="result-btn" >Result</Button>
            }
            {
                Object.keys(otherUsers).length > 0 &&
                <div className="other-users">
                    <ul>
                        {
                            Object.keys(otherUsers).map((item) => (
                                <li key={username} className="indi-progressbar">
                                    <ProgressBar value={(((otherUsers[item])/(textArray.length))*100).toFixed(0)} />
                                    <span className="progressbar-username">{item}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
            {
                showresults &&(
                    <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Result
                        </h1>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                            window.location.reload();
                        }}
                        />
                    </div>
                    <div className="modal-body">
                        <div className="big-text">
                        <div className="big-text-wpm">
                            <span>WPM</span>
                            <span>
                            {speed}
                            </span>
                        </div>
                        <div className="big-text-accuracy">
                            <span>Accuracy</span>
                            <span>
                            {accuracy}%
                            </span>
                        </div>
                        </div>
                        <div className="small-text">
                            <ul>
                                {getSortedWinners().map((item) => (
                                    <li key={username} className="winner-list">
                                        {item[1]}:  {item[0]}secs    {item[3]}%
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleContinuePractice}
                        >
                        Continue praticing
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                )
            }
        </div>
    );
};
export default Multiplayer;