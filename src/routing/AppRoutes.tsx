import { Route, Routes } from "react-router-dom";
import React, { lazy } from "react";
import { AppLayout } from "../components/appLayout/AppLayout";
import { useSetDefaultAccount } from "../modules/accounts/hooks";

const SpendingPage = lazy(() => import("./pages/spending"));

const HomePage = lazy(() => import("./pages/home"));

export function AppRoutes() {
  useSetDefaultAccount();
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/spending" element={<SpendingPage />} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}
