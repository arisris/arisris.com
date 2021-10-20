import '@/styles/global.css';
import { ThemeProvider } from 'next-themes';
import { StoreContext } from 'storeon/react';
import store from '@/store/index';

function App({ Component, pageProps }) {
  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreContext.Provider>
  );
}
export default App;
