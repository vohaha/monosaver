import React from "react";
import "./index.css";
import { GlobalState } from "./GlobalState";
import { AppRoutes } from "./routing/AppRoutes";
import { getClientInfo } from "./api";
import { useQueryClient } from "react-query";

export function App() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery("clientInfo", getClientInfo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  return (
    <GlobalState>
      <AppRoutes />
    </GlobalState>
  );
}
