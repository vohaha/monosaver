import { Account } from "../modules/accounts/type";
import { UIStatement } from "../server/src/modules/statements/types";
import { Token as AuthToken } from "../modules/auth/type";
import { getTokenFromLocalStorage } from "../modules/auth/utils";
import { AuthConfig } from "../server/src/modules/auth/type";

interface ClientConfig {
  method?: "POST" | "GET";
  body?: {};
  headers?: { [key: string]: string };
}

function createClient(apiURL: string) {
  return function client<T>(
    endpoint: string,
    { body, ...customConfig }: ClientConfig = {}
  ): Promise<T> {
    const headers = new Headers({ "Content-Type": "application/json" });
    const authToken = getTokenFromLocalStorage();
    if (authToken) {
      headers.append("Authorization", createAuthorizationHeader(authToken));
    }
    if (customConfig.headers != null) {
      Object.entries(customConfig.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }
    const config: RequestInit = {
      method: body ? "POST" : "GET",
      ...customConfig,
      headers,
    };
    if (body) {
      config.body = JSON.stringify(body);
    }

    return window
      .fetch(`${apiURL}/${endpoint}`, config)
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      });
  };
}

const authAPI = createClient(`${process.env.REACT_APP_API_URL}/auth`);
export async function fetchLogin(body: { email: string; password: string }) {
  return await authAPI<AuthConfig>("login", { body });
}
export async function fetchSignUp(body: { email: string; password: string }) {
  return await authAPI("signup", { body });
}

const protectedAPI = createClient(`${process.env.REACT_APP_API_URL}/api`);

export async function getClientInfo() {
  return await protectedAPI("v1/client-info");
}
export async function getJars() {
  return await protectedAPI("jars");
}
export async function getAccounts() {
  return await protectedAPI<Account[]>("v1/accounts");
}
export async function getStatements(
  accountId: string,
  month: number,
  year: number
) {
  return await protectedAPI<UIStatement[]>(
    `v1/statements/${accountId}/${month}/${year}`
  );
}

function createAuthorizationHeader(token: AuthToken) {
  return `Bearer ${token}`;
}
