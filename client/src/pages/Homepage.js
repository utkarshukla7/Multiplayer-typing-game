import React, {  useState } from "react";
import Button from "react-bootstrap/esm/Button.js";
import { UserPopUp } from "./UserPopUp.js";
import "./Homepage.css";
export const Homepage = () => {

  const [popup, setPopup] = useState(false);
  const handleClick = () => {
    setPopup(true);
  };

  
  return (
    <>
      <div className="homepage">
        <div className="homepage-center">
          <h1 className="homepage-heading">Project for Tally-Code-Brewers</h1>

          <Button
            variant="secondary"
            onClick={handleClick}
            className="homepage-button"
          >
            Start Typing !!!
          </Button>
        </div>
        {popup && <UserPopUp />}
      </div>
    </>
  );
};
