import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Room1 from "./pages/Room1";
import EndPage from "./pages/EndPage";
import FailPage from "./pages/FailPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room1" element={<Room1 />} />
        <Route path="/end-page" element={<EndPage />} />
        <Route path="/fail-page" element={<FailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
