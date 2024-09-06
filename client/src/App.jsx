import { Routes, Route, Navigate } from "react-router-dom";
import { useFavicon } from "./hooks/useFavicon";
import { ProtectedRoute } from "./components/protected-route";
import { Auth } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Room } from "@/pages/room";

function App() {
  useFavicon();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/room" element={<Room />} />
      <Route element={<ProtectedRoute />}></Route>
    </Routes>
  );
}

export default App;
