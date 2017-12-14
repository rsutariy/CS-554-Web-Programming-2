import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const title = "Use of Poke API";

ReactDOM.render(
  <App title={title} author="Ruchika" now={new Date()} />,
  document.getElementById("root")
);
registerServiceWorker();