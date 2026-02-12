import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Room1 from "./pages/Room1";
import EndPage from "./pages/EndPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/master-mystery" element={<Home />} />
        <Route path="/Room1" element={<Room1 />} />
        <Route path="/EndPage" element={<EndPage />} />
      </Routes>
    </BrowserRouter>
  );
}
