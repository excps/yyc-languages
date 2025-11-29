
  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { initSentry } from "./lib/sentry";

  // Initialize Sentry error tracking (production only)
  initSentry();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  