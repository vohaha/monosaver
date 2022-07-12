import { Statement, UIStatement } from "../types";
import mccJson from "../../../assets/mcc.json";

export class UiStatement implements UIStatement {
  id: string;
  time: number;
  amount: number;
  comment: string;
  description: string;
  group: {
    id: number;
    name: string;
  };
  constructor(input: Statement) {
    this.id = input.id;
    this.time = input.time;
    this.amount = input.amount;
    this.comment = input.comment || "";
    this.description = input.description;
    this.group = {
      id: input.mcc,
      name:
        mccJson.find(({ mcc }) => +input.mcc === +mcc)?.group?.description ||
        "",
    };
  }
}
