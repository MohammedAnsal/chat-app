// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Toaster } from "sonner";
import "./index.css";
import ChatProvider from "./Context/ChatProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
      <Toaster richColors position="top-center" />
      <App />
    </ChatProvider>
  </BrowserRouter>
);
