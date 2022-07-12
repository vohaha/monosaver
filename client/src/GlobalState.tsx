import React from "react";
import { AccountsMetaProvider } from "./modules/accounts/context";

export function GlobalState({ children }: { children: React.ReactNode }) {
  return <AccountsMetaProvider>{children}</AccountsMetaProvider>;
}
