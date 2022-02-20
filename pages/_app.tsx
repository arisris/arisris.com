import "styles/global.css";
import { AppProps } from "next/app";
import { configResponsive } from "ahooks";
import { ThemeProvider } from "next-themes";

configResponsive({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
});
function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
