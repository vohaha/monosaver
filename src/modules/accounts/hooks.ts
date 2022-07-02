import { useQuery } from "react-query";
import { getAccounts } from "../../api";
import { useAccountsMeta } from "./context";
import { useEffect, useMemo } from "react";
import { getEnabledAccounts } from "./utils";
import { setDefaultAccount } from "./actions";

export function useFetchAccounts() {
  return useQuery("accounts", getAccounts);
}

export function useEnabledAccounts() {
  const { data: allAccounts } = useFetchAccounts();
  const [{ enabledAccountIds }] = useAccountsMeta();
  return useMemo(() => {
    if (allAccounts == null) {
      return [];
    }
    return getEnabledAccounts(allAccounts, enabledAccountIds);
  }, [allAccounts, enabledAccountIds]);
}

export function useSetDefaultAccount() {
  const { data: accounts } = useFetchAccounts();
  const [, dispatch] = useAccountsMeta();
  useEffect(() => {
    if (accounts != null) {
      setDefaultAccount(accounts, dispatch);
    }
  }, [accounts, dispatch]);
}
