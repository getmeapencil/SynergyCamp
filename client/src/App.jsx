import { Routes, Route, Navigate } from "react-router-dom";
import { useFavicon } from "./hooks/useFavicon";
import { ProtectedRoute } from "./components/protected-route";
import { Auth } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Room } from "./pages/room";
import useSocketIO from "./utils/useSocketio";
import { SocketContext } from "./utils/context";

function App() {
  useFavicon();
  const socket = useSocketIO();
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/room/:roomId" element={<Room />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
