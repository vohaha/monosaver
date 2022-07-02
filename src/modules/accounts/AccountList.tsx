import { currencyFormatter } from "../formatters/currency";
import { useAccountsMeta } from "./context";
import { ErrorFallback } from "../../components/ErrorFallback";
import { FullSizeLoader } from "../../components/loader";
import { useFetchAccounts } from "./hooks";
import { toggleAccount } from "./actions";

export default function AccountList() {
  const { data: accounts, error, refetch } = useFetchAccounts();
  const [{ enabledAccountIds }, dispatch] = useAccountsMeta();
  if (accounts == null) {
    return <FullSizeLoader />;
  }
  if (error != null) {
    return <ErrorFallback reset={refetch} />;
  }
  return (
    <ul>
      {accounts.map((account) => (
        <li key={account.id}>
          <div>
            <span>{account.currencyCode}</span>
            <span>{account.type}</span>
            <span>{account.maskedPan[0]}</span>
            <span>
              {currencyFormatter.format(
                (account.balance - account.creditLimit) / 100
              )}
            </span>
            <label htmlFor={account.id}>
              <input
                type="checkbox"
                id={account.id}
                checked={enabledAccountIds.includes(account.id)}
                onChange={() => {
                  toggleAccount(account.id, dispatch);
                }}
              />
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}
