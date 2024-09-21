import { Routes, Route, Navigate } from "react-router-dom";
import { useFavicon } from "./hooks/useFavicon";
import { ProtectedRoute } from "./components/protected-route";
import { Auth } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Room } from "./pages/room";
import { Loading } from "./pages/loading";
// import { Error } from "./pages/error";
import { useSocket } from "@/hooks/useSocket";
import { useSocketStore } from "./store/socket";
import { useUserStore } from "./store/user";
import { useEffect } from "react";

function App() {
  useFavicon();
  const socket = useSocket();
  useSocketStore.getState().setSocket(socket);
  const triedTokenRefresh = useUserStore((state) => state.triedTokenRefresh);

  useEffect(() => {
    (async function () {
      if (!triedTokenRefresh) {
        await useUserStore.getState().tryTokenRefresh();
      }
    })();
  }, [triedTokenRefresh]);

  if (!triedTokenRefresh) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
      {/* <Route path="/error" element={<Error />} /> */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
