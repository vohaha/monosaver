import React from "react";
import { AccountsMetaProvider } from "./modules/accounts/context";
import { AuthProvider } from "./modules/auth/context";

export function GlobalState({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AccountsMetaProvider>{children}</AccountsMetaProvider>
    </AuthProvider>
  );
}
