import { Account } from "../modules/accounts/type";
import { UIStatement } from "../server/src/modules/statements/types";
import thwack from "thwack";

thwack.defaults.baseURL = process.env.REACT_APP_API_URL;

const baseAPI = thwack.create({
  credentials: "include",
});

const authAPI = baseAPI.create();

export async function fetchLogin(body: { email: string; password: string }) {
  return await authAPI.post("auth/login", body);
}

export async function fetchSignUp(body: { email: string; password: string }) {
  return await authAPI.post("auth/signup", body);
}

export async function fetchLogout() {
  return await authAPI.get("auth/logout");
}

export async function fetchVerify() {
  return await authAPI.get("auth/verify");
}

const protectedAPI = baseAPI.create();

export async function getClientInfo() {
  return await protectedAPI.get("api/v1/client-info");
}

export async function getJars() {
  return await protectedAPI.get("jars");
}

export async function getAccounts() {
  return await protectedAPI.get<Account[]>("api/v1/accounts");
}

export async function getStatements(
  accountId: string,
  month: number,
  year: number
) {
  return await protectedAPI.get<UIStatement[]>(
    `api/v1/statements/${accountId}/${month}/${year}`
  );
}
