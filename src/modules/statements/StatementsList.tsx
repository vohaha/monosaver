import { NumberFormatter } from "../formatters/types";
import { Statement } from "./types";

export function StatementsList({
  statements,
  currencyFormatter,
}: {
  statements: Statement[];
  currencyFormatter: NumberFormatter;
}) {
  return statements?.length ? (
    <ul style={{ width: "100%" }}>
      {statements.map((trx) => (
        <li key={trx.id}>
          <table width="100%">
            <thead>
              <tr>
                <th>group</th>
                <th>mcc</th>
                <th>description</th>
                <th>amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{trx.group.name}</td>
                <td>{trx.group.id}</td>
                <td>{trx.description}</td>
                <td>{currencyFormatter.format(trx.amount / 100)}</td>
              </tr>
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  ) : null;
}
