import { useState, useEffect ,useRef} from "react";
import "./TypingTest.css";

export const TypingTest = () => {
  const [ind, setInd] = useState(0);
  const [flag, setFlag] = useState(true);
  const [arr, setArr] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [textArray, setTextArray] = useState([]);
  const underlinedElementRef = useRef(null);
  // [
  //   "h",
  //   "e",
  //   "l",
  //   "l",
  //   "o",
  //   " ",
  //   "p",
  //   "h",
  //   "h",
  //   " ",
  //   "h",
  //   "h",
  //   "h",
  //   "h",
  //   "h",
  //   "h",
  //   "h",
  //   " ",
  //   "h",
  //   "h",
  //   "h",
  //   " ",
  //   "h",
  //   "h",
  //   "h",
  // ]
  
  const [help, setHelp] = useState(0);
  useEffect(()=>{
    const text = "This is a sample text with long input so that we can test the typing speed of the user. okay adding one more line to see output its not working i dont knwo wha tot do"
    const tt = text.split("");
    setTextArray(tt);
  },[inputArray]);
  
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
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      return;
    }
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

  return (
    <div>
      <div className="textbox-solo">
      {arr.map((item) => (
        
        <span
        style={{
          color: item.color,
          textDecoration:
          item.ind === inputArray.length ? "underline" : "none",
        }}
        className="characters-solo"
        ref={(item.ind === inputArray.length || item.ind === 0) ? underlinedElementRef : null}
        >
          {item.char}
        </span>
      ))}
      </div>
      <input value={inputArray.join("")} onChange={handleInputChange} className="input-box-solo"></input>
      <div className="speed-solo">
        Speed (Words per minute)
      </div>
      <div className="acc-solo">
        rustee
      </div>
    </div>
  );
};