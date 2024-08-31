import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./pages/error.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/index.jsx";
import Login from "./pages/login/index.jsx";
const apiUrl = "147321809761-2b85ud7g5nitr0gjnc6rc13gkta7uob5.apps.googleusercontent.com";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={apiUrl}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
);
