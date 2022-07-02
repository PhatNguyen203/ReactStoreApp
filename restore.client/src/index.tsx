import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/index.css";
import App from "./app/layout/App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
