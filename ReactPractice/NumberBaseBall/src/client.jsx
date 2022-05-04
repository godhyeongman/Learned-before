import React from "react";
import ReactDOM from "react-dom/client";

import { Baseball } from "./BaseballComponent";

const rootNode = document.querySelector("#root");
const root = ReactDOM.createRoot(rootNode);

root.render(
  <React.StrictMode>
    <Baseball />
  </React.StrictMode>
);
