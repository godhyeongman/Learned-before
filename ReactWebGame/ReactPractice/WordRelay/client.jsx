import React from "react";
import ReactDOM from "react-dom/client";

import WordRelay from "./WordRelay";

const rootNode = document.querySelector("#root");
const root = ReactDOM.createRoot(rootNode);

root.render(
  <React.StrictMode>
    <WordRelay />
  </React.StrictMode>
);
