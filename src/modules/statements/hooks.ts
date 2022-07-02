import { useMemo } from "react";
import { useQueries } from "react-query";
import { getStatements } from "../../api";
import { useEnabledAccounts } from "../accounts/hooks";
import { UIStatement } from "../../server/src/modules/statements/types";
import groupBy from "just-group-by";

export function useFetchStatements() {
  const enabledAccounts = useEnabledAccounts();
  const now = new Date();
  const statementsResponse = useQueries(
    enabledAccounts.map((account) => ({
      queryKey: ["statement", account?.id || "defaultAccount"],
      queryFn: () =>
        getStatements(
          account?.id || "0", // 0 for default account
          now.getMonth(),
          now.getFullYear()
        ),
    }))
  );
  const isLoading = statementsResponse.find(({ isLoading }) => isLoading);
  const isError = statementsResponse.find(({ status }) => status === "error");
  const isSuccess = statementsResponse.every(
    ({ status }) => status === "success"
  );
  const statements = useMemo(() => {
    if (isLoading || isError || !isSuccess) {
      return [];
    }
    return statementsResponse.reduce<UIStatement[]>((acc, curr) => {
      if (curr.data != null) {
        acc.push(...curr.data);
      }
      return acc;
    }, []);
  }, [isError, isLoading, isSuccess, statementsResponse]);
  const statementsByGroup = useMemo(
    () =>
      statements?.length
        ? Object.entries(
            groupBy(statements, (statement) => statement.group.name)
          )
        : null,
    [statements]
  );
  return {
    statements,
    statementsByGroup,
    isLoading,
    isError,
  };
}
