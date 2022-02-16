import { useLocalStorageState } from "ahooks";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { boolean } from "zod";

const Context = createContext({
  dark: false,
  setDark: (e: boolean) => {}
});
export function useDarkMode() {
  const { dark, setDark } = useContext(Context);
  return { toggle: () => setDark(!dark), dark };
}

export const UseDarkModeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [dark, setDark] = useLocalStorageState("__dark_mode__", {
    defaultValue: false
  });
  useEffect(() => {
    const ec: DOMTokenList = document.documentElement.classList ?? null,
      clazz = "dark";
    if (dark || window.matchMedia("(prefers-color-scheme: dark)").matches) {
      if (!ec.contains(clazz)) {
        ec.add(clazz);
      }
    } else if (ec.contains(clazz)) {
      ec.remove(clazz);
    }
  }, [dark]);
  return (
    <Context.Provider value={{ dark, setDark }}>{children}</Context.Provider>
  );
};
