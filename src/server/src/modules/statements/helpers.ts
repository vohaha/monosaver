import { Statement, UIStatement } from "./types";
import { UiStatement } from "./models";

export function getStatementCacheKey(path: string, key: string) {
  return key + path;
}

export function getMonthRange(month: number, year: number) {
  const startOfMonth = new Date(year, month, 1).getTime();
  const startOfNextMonth = new Date(year, +month + 1, 1).getTime();
  const endOfMonth = new Date(startOfNextMonth - 1).getTime();
  return [startOfMonth, endOfMonth];
}

export function uitifyStatements(statements: Statement[]): UIStatement[] {
  return statements.map((statement) => {
    return new UiStatement(statement);
  });
}
