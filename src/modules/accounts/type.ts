import { UIAccount } from "../../server/modules/accounts/types";

export interface State {
  defaultAccountId: string | null;
  enabledAccountIds: string[];
}

export enum ActionType {
  setDefaultAccount = "setDefaultAccount",
  toggle = "toggle",
}

export interface Action {
  type: ActionType;
  payload: string;
}

export interface Account extends UIAccount {}
