import React, { useEffect, useState } from "react";
import Layout from "../layout/layout.js";
import Button from "react-bootstrap/esm/Button.js";
import { useAuth0 } from "@auth0/auth0-react";
import { UserPopUp } from "./UserPopUp.js";
import "./Homepage.css";
export const Homepage = () => {
  //   const { user, isAuthenticated } = useAuth0();
  //   const [User, setUser] = React.useState(null);
  //   const [username, setUsername] = useState("");
  const [popup, setPopup] = useState(false);
  //   const handleUpdate = (username) => {
  //     setUsername(username);
  //     setPopup(false);
  //   };
  //   useEffect(() => {
  //     const s = `@@auth0spajs@@::${process.env.REACT_APP_CLIENTID_URL}::@@user@@`;
  //     const data = localStorage.getItem(s);
  //     if (data) {
  //       const parseData = JSON.parse(data);
  //       setUser(parseData.decodedToken.user);
  //     }
  //   }, []);

  //   console.log(isAuthenticated);
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
