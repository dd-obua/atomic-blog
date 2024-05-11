import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import AppMemo from "./AppMemo";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppMemo />
  </StrictMode>
);
