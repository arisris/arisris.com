((themeKey, toggleId, dark, light) => {
  const getTheme = () => {
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem(themeKey)
    ) {
      return localStorage.getItem(themeKey);
    }
    if (window.matchMedia(`(prefers-color-scheme: ${dark})`).matches) {
      return dark;
    }
    return light;
  };
  const setTheme = (theme) => {
    if (theme === light) {
      document.documentElement.classList.remove(dark);
    } else {
      document.documentElement.classList.add(dark);
    }
    window.localStorage.setItem(themeKey, theme);
  };
  window.addEventListener("DOMContentLoaded", () => {
    document.getElementById(toggleId).addEventListener("click", (ev) => {
      ev.preventDefault();
      setTheme(getTheme() === dark ? light : dark);
    });
  });
  setTheme(getTheme());
})("arisris-theme-appearance", "toggle-dark", "dark", "light");