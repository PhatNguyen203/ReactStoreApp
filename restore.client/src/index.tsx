import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/index.css";
import App from "./app/layout/App";
import { Router } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserHistory } from "history";
import { StoreProvider } from "./app/context/StoreContext";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router history={history}>
    <React.StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </React.StrictMode>
  </Router>
);
