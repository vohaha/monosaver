import { Account } from "../modules/accounts/type";
import { UIStatement } from "../server/src/modules/statements/types";

interface ClientConfig {
  method?: "POST" | "GET";
  body?: {};
  headers?: {};
}

function createClient(apiURL: string) {
  return function client<T>(
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

const api = createClient(`${process.env.REACT_APP_API_URL}/api`);

export async function getClientInfo() {
  return await api("v1/client-info");
}
export async function getJars() {
  return await api("jars");
}
export async function getAccounts() {
  return await api<Account[]>("v1/accounts");
}
export async function getStatements(
  accountId: string,
  month: number,
  year: number
) {
  return await api<UIStatement[]>(
    `v1/statements/${accountId}/${month}/${year}`
  );
}
