import { Routes, Route, Navigate } from "react-router-dom";
import { useFavicon } from "./hooks/useFavicon";
import { ProtectedRoute } from "./components/protected-route";
import { Auth } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Room } from "./pages/room";
import { useSocket } from "@/hooks/useSocket";
import { useSocketStore } from "./store/socket";
import { useUserStore } from "./store/user";
import { useEffect } from "react";

function App() {
  useFavicon();
  const { socket } = useSocket();
  console.log("App ~ socket:", socket);
  useSocketStore.getState().setSocket(socket);

  useEffect(() => {
    useUserStore.getState().fetchUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Route>
    </Routes>
  );
}

export default App;
