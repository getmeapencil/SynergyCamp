import { Auth } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<ProtectedRoute />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
