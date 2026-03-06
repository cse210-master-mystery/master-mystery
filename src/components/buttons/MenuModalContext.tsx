import { createContext, useContext } from "react";

export const MenuModalContext = createContext<{ closeModal: () => void } | null>(null);

export function useMenuModalClose() {
  const ctx = useContext(MenuModalContext);
  return ctx?.closeModal ?? (() => {});
}
