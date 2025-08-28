import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import "./index.css";
import { initGA, setUserId, setUserProps, pageView } from "./analytics";

const MEASUREMENT_ID =
  (import.meta as any).env?.VITE_GA_MEASUREMENT_ID || "";

if (MEASUREMENT_ID) {
  initGA(MEASUREMENT_ID);
  // demo user — replace with real auth if needed
  setUserId("demo-user-123");
  setUserProps({ plan: "free", org: "POC" });
  pageView(window.location.pathname + window.location.search, document.title);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: { borderRadius: 12 }
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
