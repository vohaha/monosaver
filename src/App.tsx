import React from "react";
import "./index.css";
import { GlobalState } from "./GlobalState";
import { AppRoutes } from "./routing/AppRoutes";

export function App() {
  return (
    <GlobalState>
      <AppRoutes />
    </GlobalState>
  );
}
