import { Dispatch, SetStateAction } from "react";
import { UIUser } from "../../server/src/modules/users/types";

export type Token = string | null;
export type TokenUpdater = Dispatch<SetStateAction<Token>>;
export type User = UIUser | null;

export interface State {
  token: Token;
  setToken: TokenUpdater;
  user: User;
}
