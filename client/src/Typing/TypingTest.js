import { useState, useEffect, useRef } from "react";
import "./TypingTest.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TypingTest = (props) => {
  const [ind, setInd] = useState(0);
  const [flag, setFlag] = useState(true);
  const [arr, setArr] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [textArray, setTextArray] = useState([]);
  const underlinedElementRef = useRef(null);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(30);

  const [count, setCount] = useState(30);
  const [hasstarted, sethasstarted] = useState(false);
  const [totalchar, setTotalchar] = useState(0);
  // console.log("hi from tester", props.time);
  const times = useRef({
    startTime: null,
    endTime: null,
    timeDifference: null,
    started: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    setTime(props.time);
    setLevel(props.level);
    setCount(props.time);
  }, [props.time, props.level]);
  // console.log(time, level);
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
  }, [level, time]);
  useEffect(() => {
    setTotalchar((prevkey) => prevkey + 1);
    console.log(totalchar);
    if (times.current.started === false) {
      times.current.started = true;
      times.current.startTime = new Date();
      console.log(times.current.startTime, "start");
    }

    const temp = [];
    let c = 0;
    const giveColor = (index) => {
      if (index === textArray.length - 1) {
        if (inputArray.length >= textArray.length) {
          times.current.endTime = new Date();
          times.current.timeDifference =
            times.current.endTime - times.current.startTime;
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
    if (times.current.timeDifference) {
      console.log(times.current.timeDifference, "diff");
      if (times.current.timeDifference / 1000 > time) {
        return;
      }
    }
    if (times.current.endTime) {
      handleend();
    }
  }, [inputArray]);

  const handleInputChange = (e) => {
    if (!hasstarted) {
      sethasstarted(true);
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
    if (times.current.endTime !== null) {
      setCount(0);
      console.log("words over");
    } else {
      console.log("time over");
    }
    alert(totalchar);
    // navigate("/");
  };
  const handlekeypress = (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      return;
    }
  };
  const handlePaste = (event) => {
    event.preventDefault();
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
      <div className="remaining-time">{count}</div>
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
        onKeyDown={handlekeypress}
        onPaste={handlePaste}
      ></input>
      <div className="speed-solo">
        Speed (Wpm)
        <div className="speed-value">
          {count === time
            ? 0
            : (((ind / (level + 4)) * 60) / (time - count)).toFixed(0)}
        </div>
      </div>
      <div className="acc-solo">
        Accuracy
        <div className="acc-value">
          {totalchar === 1
            ? 0
            : (((ind + 1) / (totalchar - 1)) * 100).toFixed(0)}
          %
          {/* {totalchar - 1}-- totalchar
                {ind}--ind */}
        </div>
      </div>
    </div>
  );
};
