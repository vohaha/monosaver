import React, {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from "react";
import { Action, State } from "./type";

const Context = createContext<[State, Dispatch<Action>] | undefined>(undefined);

Context.displayName = "AccountsMetaContext";

const ReducerFunction: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setDefaultAccount": {
      if (action.payload == null) {
        throw new Error("setDefaultAccount must have a payload");
      }
      return {
        ...state,
        defaultAccountId: action.payload,
        enabledAccountIds: [...state.enabledAccountIds, action.payload].filter(
          onlyUnique
        ),
      };
    }
    case "toggle": {
      if (action.payload == null) {
        throw new Error("toggle must have a payload");
      }
      const newEnabledAccountIds = [...state.enabledAccountIds];
      const index = newEnabledAccountIds.findIndex(
        (id) => id === action.payload
      );
      if (index === -1) {
        newEnabledAccountIds.push(action.payload);
      } else {
        newEnabledAccountIds.splice(index, 1);
      }
      return {
        ...state,
        enabledAccountIds: newEnabledAccountIds,
      };
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
};

function Provider({ children }: { children: React.ReactNode }) {
  const value = useReducer(ReducerFunction, {
    enabledAccountIds: [],
    defaultAccountId: null,
  });
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useEntityContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(`accounts must be used within a AccountsProvider`);
  }
  return context;
}

function onlyUnique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

export const useAccountsMeta = useEntityContext;
export const AccountsMetaProvider = Provider;
