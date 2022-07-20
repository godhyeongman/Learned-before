import React from "react";
import ReactDOM from "react-dom/client";

import { Baseball } from "./BaseballComponent";
import { BaseballHook } from "./BaseballHook";

const rootNode = document.querySelector("#root");
const root = ReactDOM.createRoot(rootNode);

root.render(
  <React.StrictMode>
    <BaseballHook />
  </React.StrictMode>
);
