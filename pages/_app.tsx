import "styles/global.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { RequireAuth } from "components/Utility";
import { UseModalConextProvider } from "hooks/useModal";
import { Provider as ReactRedux } from "react-redux";
import { store } from "lib/redux/store";

// import { configResponsive } from "ahooks";
// configResponsive({
//   sm: 640,
//   md: 768,
//   lg: 1024,
//   xl: 1280,
//   "2xl": 1536
// });
function App({ Component, pageProps }: AppProps) {
  return (
    <ReactRedux store={store}>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider defaultTheme="system" attribute="class">
          <UseModalConextProvider>
            {Component.protected ? (
              <RequireAuth>
                <Component {...pageProps} />
              </RequireAuth>
            ) : (
              <Component {...pageProps} />
            )}
          </UseModalConextProvider>
        </ThemeProvider>
      </SessionProvider>
    </ReactRedux>
  );
}

export default App;
