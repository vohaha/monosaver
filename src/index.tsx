import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
