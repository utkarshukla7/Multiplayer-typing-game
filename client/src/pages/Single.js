import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { TypingTest } from "../Typing/TypingTest.js";
import "./Single.css";
import { useNavigate } from "react-router";

export const Single = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedTime, setSelectedTime] = useState(30);
  const [caller, setCaller] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hi");
  }, [caller]);
  const handleLevelChange = (event) => {
    setSelectedLevel(parseInt(event.target.value));
    setCaller(true);
    // console.log("Selected Level:", parseInt(event.target.value));
  };

  const handleTimeChange = (event) => {
    setSelectedTime(parseInt(event.target.value));
    setCaller(true);
    // console.log("Selected Time:", parseInt(event.target.value));
  };
  const handleClick = () => {
    navigate("/multi");
  };
  return (
    <Layout>
      <div className="multiplayer-btn">
        <button className="multiplayer-select" onClick={handleClick}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
              />
            </svg>
            <span> Multiplayer</span>
          </div>
        </button>
      </div>
      {/* Level selection */}
      <div className="level-container">
        <div className="radio-input">
          <label>
            <input
              value="1"
              name="value-radio"
              type="radio"
              checked={selectedLevel === 1}
              onChange={handleLevelChange}
            />
            <span>1</span>
          </label>
          <label>
            <input
              value="2"
              name="value-radio"
              type="radio"
              checked={selectedLevel === 2}
              onChange={handleLevelChange}
            />
            <span>2</span>
          </label>
          <label>
            <input
              value="3"
              name="value-radio"
              type="radio"
              checked={selectedLevel === 3}
              onChange={handleLevelChange}
            />
            <span>3</span>
          </label>
          <label>
            <input
              value="4"
              name="value-radio"
              type="radio"
              checked={selectedLevel === 4}
              onChange={handleLevelChange}
            />
            <span>4</span>
          </label>
          <span className="selection" />
        </div>
      </div>

      {/* Time selection */}
      <div className="time-container">
        <div className="radio-input">
          <label>
            <input
              value="15"
              name="time-radio"
              type="radio"
              checked={selectedTime === 15}
              onChange={handleTimeChange}
            />
            <span>15</span>
          </label>
          <label>
            <input
              value="30"
              name="time-radio"
              type="radio"
              checked={selectedTime === 30}
              onChange={handleTimeChange}
            />
            <span>30</span>
          </label>
          <label>
            <input
              value="60"
              name="time-radio"
              type="radio"
              checked={selectedTime === 60}
              onChange={handleTimeChange}
            />
            <span>60</span>
          </label>
          <label>
            <input
              value="90"
              name="time-radio"
              type="radio"
              checked={selectedTime === 90}
              onChange={handleTimeChange}
            />
            <span>90</span>
          </label>
          <span className="selection" />
        </div>
      </div>

      <TypingTest time={selectedTime} level={selectedLevel} />
    </Layout>
  );
};
