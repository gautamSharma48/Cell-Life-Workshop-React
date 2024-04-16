import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router.js";
import "./common/styles/index.css";
import { history } from "./manager/history.js";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";

const App = () => {
  return (
    <HistoryRouter history={history}>
      <Provider store={store}>
        <Router />
      </Provider>
    </HistoryRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
