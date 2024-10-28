// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
]);
createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <RouterProvider router={router} />
          <Toaster richColors />
        </TooltipProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </ErrorBoundary>,
);
