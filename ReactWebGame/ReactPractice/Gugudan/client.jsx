import React from "react";
import ReactDOM from "react-dom/client";

import { Gugudan } from "./Gugudan";

const rootNode = document.querySelector("#root");
const root = ReactDOM.createRoot(rootNode);

root.render(
  <React.StrictMode>
    <Gugudan />
  </React.StrictMode>
);
