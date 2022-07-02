import { MonoClientInfo } from "../../clientInfo/types";

enum MonoAccountType {
  black = "black",
}
enum MonoAccountCashbackType {
  UAH = "UAH",
}
export interface MonoAccount {
  id: string;
  sendId: string;
  balance: number;
  creditLimit: number;
  type: MonoAccountType;
  currencyCode: number;
  cashbackType: MonoAccountCashbackType;
  maskedPan: string[];
  iban: string;
}

export interface Account extends MonoAccount {
  clientId: MonoClientInfo["clientId"];
}

export interface UIAccount extends Account {}
