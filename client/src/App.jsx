import { Auth } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Routes, Route } from "react-router-dom";
import { useFavicon } from "./hooks/useFavicon";

function App() {
  useFavicon();
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
