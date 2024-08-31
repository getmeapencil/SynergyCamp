import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const apiUrl = "147321809761-8vpt8ec4hgabcp0s4j98shiu1s6too0s.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={apiUrl}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
