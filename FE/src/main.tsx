// main.tsx hoặc App.tsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { StrictMode } from "react";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
