import { Account } from "./type";

export function getEnabledAccounts(
  allAccounts: Account[],
  enabledAccountIds: Account["id"][]
) {
  return allAccounts?.filter(({ id }) => enabledAccountIds?.includes(id)) || [];
}
