import '@/styles/global.css';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from 'next-themes';
import { StickyWaLink } from '@/components/StickyWaLink';
import { StoreContext } from 'storeon/react';
import store from '@/store/index';

function App({ Component, pageProps }) {
  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider attribute="class">
        <NextNProgress height={2} color="#209cee" />
        <Component {...pageProps} />
        <StickyWaLink />
      </ThemeProvider>
    </StoreContext.Provider>
  );
}
export default App;
