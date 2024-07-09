import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NoteContextProvider } from "./context/NoteContext.jsx";
import { UserProvider } from "./context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </UserProvider>
  </React.StrictMode>
);
