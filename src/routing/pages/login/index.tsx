import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchLogin } from "../../../api";
import { Location } from "history";

export default function LoginPage() {
  const location = useLocation();
  const historyState = location.state as { from: Location } | null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchLogin({ email, password })
          .then(() => {
            if (historyState != null && historyState.from != null) {
              window.location.href = historyState.from.pathname;
            } else {
              window.location.href = "/";
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }}
    >
      <label>
        <span>Email</span>
        <input
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          inputMode="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Вхід</button>
    </form>
  );
}
