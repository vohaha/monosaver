import React from "react";
import { currencyFormatter } from "../../../modules/formatters/currency";
import { StatementsByGroup } from "../../../modules/statements/StatementsByGroup";

export default function SpendingPage() {
  return <StatementsByGroup currencyFormatter={currencyFormatter} />;
}
