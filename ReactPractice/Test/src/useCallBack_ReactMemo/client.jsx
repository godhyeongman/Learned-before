import React from "react";
import ReactDOM from "react-dom/client";

import Test from "./test";

const rootNode = document.querySelector("#root");
const root = ReactDOM.createRoot(rootNode);

root.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);
