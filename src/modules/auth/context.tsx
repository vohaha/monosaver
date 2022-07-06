import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { State, Token } from "./type";
import {
  getTokenFromLocalStorage,
  parseJwt,
  setTokenToLocalStorage,
} from "./utils";

const Context = createContext<State | undefined>(undefined);

Context.displayName = "AuthContext";

function ValueProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<Token>(() => getTokenFromLocalStorage());
  useEffect(() => {
    setTokenToLocalStorage(token);
  }, [token]);
  const value = useMemo(() => {
    const user = parseJwt(token);
    return { token, setToken, user };
  }, [token]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useEntityContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(`auth data must be used within a AuthProvider`);
  }
  return context;
}

export const useAuth = useEntityContext;
export const AuthProvider = ValueProvider;
