import { AppProps } from "next/dist/shared/lib/router/router";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
