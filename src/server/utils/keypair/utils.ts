import * as fs from "fs";
import path from "path";

export const PUB_KEY = fs.readFileSync(
  path.join(__dirname, "../../assets/id_rsa_pub.pem"),
  "utf8"
);

export const PRIV_KEY = fs.readFileSync(
  path.join(__dirname, "../../assets/id_rsa_priv.pem"),
  "utf8"
);
