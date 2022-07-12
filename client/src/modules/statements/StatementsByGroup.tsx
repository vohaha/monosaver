import { ErrorFallback } from "../../components/ErrorFallback";
import { FullSizeLoader } from "../../components/loader";
import { NumberFormatter } from "../formatters/types";
import { useFetchStatements } from "./hooks";
import { StatementsList } from "./StatementsList";

export function StatementsByGroup({
  currencyFormatter,
}: {
  currencyFormatter: NumberFormatter;
}) {
  const {
    statementsByGroup,
    isLoading: isStatementsLoading,
    isError: isStatementsError,
  } = useFetchStatements();
  if (isStatementsLoading) {
    return <FullSizeLoader />;
  }
  if (isStatementsError) {
    return <ErrorFallback reset={() => {}} />;
  }
  return statementsByGroup != null ? (
    <ul key="statementsByGroup">
      {statementsByGroup.map(([groupName, trxs]) => {
        const groupSum = trxs?.reduce(
          (acc, curr) => (curr.amount < 0 ? (acc += curr.amount) : acc),
          0
        );
        return (
          <li key={groupName}>
            <details>
              <summary>{`${groupName} - ${currencyFormatter.format(
                Math.abs(groupSum / 100)
              )}`}</summary>
              <StatementsList
                statements={trxs}
                currencyFormatter={currencyFormatter}
              />
            </details>
          </li>
        );
      })}
    </ul>
  ) : null;
}
