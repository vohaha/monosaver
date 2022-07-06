import { Token, User } from "./type";

export function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem("token");
}

export function setTokenToLocalStorage(token: Token) {
  token == null
    ? localStorage.removeItem("token")
    : localStorage.setItem("token", token);
}

export function parseJwt(token: Token): User {
  if (token == null) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
