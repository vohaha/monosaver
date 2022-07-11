import { useQuery } from "react-query";
import { getAccounts } from "../../api";
import { useAccountsMeta } from "./context";
import { useEffect, useMemo } from "react";
import { getEnabledAccounts } from "./utils";
import { setDefaultAccount } from "./actions";

export function useFetchAccounts() {
  return useQuery(["accounts"], getAccounts);
}

export function useEnabledAccounts() {
  const { data: apiResponse } = useFetchAccounts();
  const [{ enabledAccountIds }] = useAccountsMeta();
  return useMemo(() => {
    if (apiResponse == null) {
      return [];
    }
    const allAccounts = apiResponse.data;
    if (allAccounts == null) {
      return [];
    }
    return getEnabledAccounts(allAccounts, enabledAccountIds);
  }, [apiResponse, enabledAccountIds]);
}

export function useSetDefaultAccount() {
  const { data: apiResponse } = useFetchAccounts();
  const [, dispatch] = useAccountsMeta();
  useEffect(() => {
    if (apiResponse == null) {
      return;
    }
    const accounts = apiResponse.data;
    if (accounts != null) {
      setDefaultAccount(accounts, dispatch);
    }
  }, [apiResponse, dispatch]);
}
