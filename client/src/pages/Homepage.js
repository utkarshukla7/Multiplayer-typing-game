import React, { useEffect, useState } from "react";
import Layout from "../layout/layout.js";
import Button from "react-bootstrap/esm/Button.js";
import { useAuth0 } from "@auth0/auth0-react";
import { UserPopUp } from "./UserPopUp.js";
import "./Homepage.css";
import socket from "../socket.js";
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
