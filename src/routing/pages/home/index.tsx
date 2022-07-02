import { currencyFormatter } from "../../../modules/formatters/currency";
import React from "react";
import { StatementsList } from "../../../modules/statements/StatementsList";
import { useFetchStatements } from "../../../modules/statements/hooks";

export default function HomePage() {
  const { statements } = useFetchStatements();
  return (
    <StatementsList
      statements={statements}
      currencyFormatter={currencyFormatter}
    />
  );
}
