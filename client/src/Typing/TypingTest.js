import { useState, useEffect, useRef } from "react";
import "./TypingTest.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TypingTest = () => {
  const [ind, setInd] = useState(0);
  const [flag, setFlag] = useState(true);
  const [arr, setArr] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [textArray, setTextArray] = useState([]);
  const underlinedElementRef = useRef(null);
  const [level, setLevel] = useState(1);
  const [count, setCount] = useState(30);
  const [hasstarted, sethasstarted] = useState(false);
  const [totalchar, setTotalchar] = useState(0);

  const times = useRef({
    startTime: null,
    endTime: null,
    timeDifference: null,
    started: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/utility/generatetext", { level: level })
      .then((response) => {
        if (response.data.success) {
          const tt = response.data.paragraph.split("");
          setTextArray(tt);
          setFlag(true);
        }
      });
  }, []);
  useEffect(() => {
    setTotalchar((prevkey) => (prevkey + 1));
    console.log(totalchar);
    if(times.current.started === false) {
      times.current.started = true;
      times.current.startTime = new Date();
      console.log(times.current.startTime, "start");
    }
    
    const temp = [];
    let c = 0;
    const giveColor = (index) => {
      if(index === textArray.length - 1) {
        if(inputArray.length >= textArray.length) {
          times.current.endTime = new Date();
          times.current.timeDifference = times.current.endTime - times.current.startTime;
          console.log(times.current.endTime, "end");
        }
      }
      if (inputArray.length === 0) return "black";
      if (textArray[index] === inputArray[index]) {
        c += 1;
        if (index === c - 1) {
          setInd(index);
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
    if(times.current.timeDifference) {
      console.log(times.current.timeDifference, "diff");
      if(times.current.timeDifference / 1000 > 30) {
        return;
      }
    }
    if(times.current.endTime){
      handleend();
    }
  }, [inputArray]);

  const handleInputChange = (e) => {
    if (!hasstarted) {
      sethasstarted(true);
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      return;
    }
    setFlag(false);
    setInputArray(e.target.value.split(""));
    sethasstarted(true);
  };
  
  useEffect(() => {
    if (underlinedElementRef.current) {
      underlinedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [arr]);

  useEffect(() => {
    let interval;

    if (hasstarted) {
      interval = setInterval(() => {
        setCount((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hasstarted]);
  
  const handleend = () => {
    if(times.current.endTime !== null) {
      setCount(0);
      console.log("words over");
    }
    else{
      console.log("time over");
    }
    alert(totalchar);
    // navigate("/");
  };

  useEffect(() => {
    if (count === 0) {
      handleend();
    }
  }, [count]);


  if (textArray.length === 0) {
    return null;
  }
  return (
    <div>
      <div className="textbox-solo">
        {flag
          ? textArray.map((item) => (
              <span
                style={{
                  color: "black",
                }}
                className="characters-solo"
              >
                {item}
              </span>
            ))
          : arr.map((item) => (
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
            ))}
      </div>
      <input
        value={inputArray.join("")}
        onChange={handleInputChange}
        className="input-box-solo"
      ></input>
      <div className="speed-solo">Speed (Wpm)-- {count === 30 ? 0 : ((ind/5)*60/(30-count)).toFixed(0)}
      </div>
      <div className="acc-solo">{totalchar === 1 ? 0 :(((ind + 1)/(totalchar - 1)) * 100).toFixed(0)}%
                {totalchar - 1}-- totalchar
                {ind}--ind
      </div>
    </div>
  );
};