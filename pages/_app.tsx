import "styles/global.css";
import { AppProps } from "next/app";
import { configResponsive } from "ahooks";
import { UseDarkModeProvider } from "hooks/useDarkMode";

configResponsive({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
});
function App({ Component, pageProps }: AppProps) {
  return (
    <UseDarkModeProvider>
      <Component {...pageProps} />
    </UseDarkModeProvider>
  );
}

export default App;
