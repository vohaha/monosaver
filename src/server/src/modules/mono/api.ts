import axios from "axios";

const monoPersonal = axios.create({
  baseURL: "https://api.monobank.ua/personal",
});

monoPersonal.defaults.headers.common["X-Token"] =
  "uk7KkKvFE4cDbTQitkyoY23rYEnx5TIg8PevCh8o7vmU";

export async function fetchClientInfo() {
  return await monoPersonal.get("/client-info");
}

export async function fetchTransactions(
  accountId: string,
  from: string,
  to: string
) {
  return await monoPersonal.get(`/statement/${accountId}/${from}/${to}`);
}
