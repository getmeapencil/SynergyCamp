import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
  const { isAuthenticated, triedTokenRefresh } = useUserStore();
  const socket = useSocket();
  useSocketStore.getState().setSocket(socket);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      if (!triedTokenRefresh) {
        await useUserStore.getState().tryTokenRefresh();
      }
      setAuthLoading(false);
    })();
  }, [triedTokenRefresh]);

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
