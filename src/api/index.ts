import { Account } from "../modules/accounts/type";
import { UIStatement } from "../server/src/modules/statements/types";

interface ClientConfig {
  method?: "POST" | "GET";
  body?: {};
  headers?: {};
}

function client<T>(
  endpoint: string,
  { body, ...customConfig }: ClientConfig = {}
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.ok) {
        return await response.json();
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    });
}

export async function getClientInfo() {
  return await client("v1/client-info");
}
export async function getJars() {
  return await client("jars");
}
export async function getAccounts() {
  return await client<Account[]>("v1/accounts");
}
export async function getStatements(
  accountId: string,
  month: number,
  year: number
) {
  return await client<UIStatement[]>(`statement/${accountId}/${month}/${year}`);
}
