import { Dispatch } from "react";
import { Account, Action, ActionType } from "./type";

export function setDefaultAccount(
  accounts: Account[],
  dispatch: Dispatch<Action>
) {
  const defaultAccountId = accounts.find(
    (acc) => acc.type === "black" && acc.currencyCode === 980
  )?.id;
  if (defaultAccountId == null) {
    throw new Error("No default account found");
  }
  dispatch({
    type: ActionType.setDefaultAccount,
    payload: defaultAccountId,
  });
}

export function toggleAccount(
  accountId: Account["id"],
  dispatch: Dispatch<Action>
) {
  dispatch({
    type: ActionType.toggle,
    payload: accountId,
  });
}
