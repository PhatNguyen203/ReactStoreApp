import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/index.css";
import App from "./app/layout/App";
import { Router } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router history={history}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);
