import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

import { MultistepStepValidationProvider } from "./context/MultistepStepValidationContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MultistepStepValidationProvider>
      <App />
    </MultistepStepValidationProvider>
  </React.StrictMode>
);
