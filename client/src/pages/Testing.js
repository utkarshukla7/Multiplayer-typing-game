import { useState, useEffect } from "react";

export const Testing = () => {
  const [ind, setInd] = useState(0);
  const [flag, setFlag] = useState(true);
  const [arr, setArr] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [textArray, setTextArray] = useState([
    "h",
    "e",
    " ",
    "l",
    " ",
    "o",
    "p",
  ]);
  const [help, setHelp] = useState(0);

  useEffect(() => {
    console.log(inputArray);
    const temp = [];
    let c = 0;
    const giveColor = (index) => {
      console.log(index, inputArray[index], textArray[index], flag);
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
    setInputArray(e.target.value.split(""));
  };

  return (
    <div>
      {arr.map((item) => (
        <span
          style={{
            color: item.color,
            textDecoration:
              item.ind === inputArray.length ? "underline" : "none",
          }}
        >
          {item.char}
        </span>
      ))}
      <input value={inputArray.join("")} onChange={handleInputChange}></input>
    </div>
  );
};
