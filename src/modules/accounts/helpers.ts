import { Account, MonoAccount } from "./types";

export function clientifyAccount(clientId: string) {
  return (account: MonoAccount): Account => ({
    ...account,
    clientId,
  });
}
