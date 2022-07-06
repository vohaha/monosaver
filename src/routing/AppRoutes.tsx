import { Route, Routes } from "react-router-dom";
import React, { lazy } from "react";
import { AppLayout } from "../components/appLayout/AppLayout";
import { RequireAuth } from "../modules/auth/RequireAuth";

const SpendingPage = lazy(() => import("./pages/spending"));
const HomePage = lazy(() => import("./pages/home"));
const LoginPage = lazy(() => import("./pages/login"));

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="/spending" element={<SpendingPage />} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
