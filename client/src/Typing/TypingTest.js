import { useState, useEffect, useRef } from "react";
import "./TypingTest.css";
import axios from "axios";
export const TypingTest = () => {
  const [ind, setInd] = useState(0);
  const [flag, setFlag] = useState(true);
  const [arr, setArr] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [textArray, setTextArray] = useState([]);
  const underlinedElementRef = useRef(null);
  const [level, setLevel] = useState(1);

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
  console.log(textArray);
  useEffect(() => {
    const temp = [];
    let c = 0;
    const giveColor = (index) => {
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
  }, [inputArray]);

  const handleInputChange = (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      return;
    }
    setFlag(false);
    setInputArray(e.target.value.split(""));
  };
  useEffect(() => {
    if (underlinedElementRef.current) {
      underlinedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [arr]);
  if (textArray.length === 0) {
    return null;
  }
  console.log(flag, textArray);
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
      <div className="speed-solo">Speed (Words per minute)</div>
      <div className="acc-solo">rustee</div>
    </div>
  );
};
