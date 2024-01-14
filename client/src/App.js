import "./App.css";
import { Homepage } from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import { Single } from "./pages/Single";
import { Multi } from "./pages/Multi";
import {Multiplayer} from "./pages/Multiplayer";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/single" element={<Single />} />
        <Route path="/multi" element={<Multi />} />
        <Route path="/lobby/:roomid" element={<Multiplayer/>} />
      </Routes>
    </>
  );
}

export default App;
