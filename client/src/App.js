import "./App.css";
import { createRoot } from "react-dom/client";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "./layout/layout";
import { Homepage } from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import { Single } from "./pages/Single";
import { Multi } from "./pages/Multi";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/single" element={<Single />} />
        <Route path="/multi" element={<Multi />} />
      </Routes>
    </>
  );
}

export default App;
