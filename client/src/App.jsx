import { Auth } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Routes, Route } from "react-router-dom";
import Room from "./pages/room";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room" element={<Room />} />

        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
