import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const title = "Marvel Superheroes";

ReactDOM.render(
  <App title={title} author="Phil" now={new Date()} />,
  document.getElementById("root")
);
registerServiceWorker();
