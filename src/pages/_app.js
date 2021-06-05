import { SWRConfig } from "swr";
import { StoreContext } from "storeon/react";
import store from "../store";

import "tailwindcss/tailwind.css";
import "tailwindcss/screens.css";

const fetcher = function (resource, init) {
  return fetch(resource, init).then((data) => data.json());
};

function PageApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <StoreContext.Provider value={store}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    </SWRConfig>
  );
}
export default PageApp;
