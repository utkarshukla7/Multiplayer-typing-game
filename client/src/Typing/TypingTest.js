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
  const [stats, setStats] = useState(false);
  const [count, setCount] = useState(30);
  const [hasstarted, sethasstarted] = useState(false);
  const [totalchar, setTotalchar] = useState(0);
  const modalRef = useRef(null);

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
    setInputArray([]);
    setTotalchar(0);
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
        handleend();
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
      setStats(true);
      console.log(stats);
      console.log("words over");
    } else {
      setStats(true);
      console.log("time over");
    }
  };

  useEffect(() => {
    if (stats) {
      // Show the modal when stats becomes true
      const modalElement = document.getElementById("exampleModal");
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  }, [stats]);



  const handlekeypress = (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      return;
    }
  };
  
  const handlePaste = (event) => {
    event.preventDefault();
  };
  const handleContinuePractice = () => {
    setStats(false);
    window.location.reload();
  };


  useEffect(() => {
    if (count === 0) {
      handleend();
    }
  }, [count]);



  useEffect(() => {
    if (stats) {
      const modalElement = document.getElementById("exampleModal");
      const modal = new window.bootstrap.Modal(modalElement);
      modalRef.current = modal;
      modal.show();
    } else {
      if (modalRef.current) {
        modalRef.current.hide();
        document.body.classList.remove("modal-open");
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
      }
    }
  }, [stats]);

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
        oncontextmenu="return false;" 
        autocomplete="off"
        onClick={(e) => {
          e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        }}
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
      {stats && (
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
                      {count === time
                        ? 0
                        : (((ind / (level + 4)) * 60) / (time - count)).toFixed(
                            0
                          )}
                    </span>
                  </div>
                  <div className="big-text-accuracy">
                    <span>Accuracy</span>
                    <span>
                      {totalchar === 1
                        ? 0
                        : (((ind + 1) / (totalchar - 1)) * 100).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
                <div className="small-text">
                  <span className="small-text-content">
                    Total characters : {totalchar - 1}
                  </span>
                  <span className="small-text-content">
                    Correct characters : {ind + 1}
                  </span>
                  <span className="small-text-content">
                    Wrong characters : {totalchar - ind - 2}
                  </span>
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
      )}
    </div>
  );
};
