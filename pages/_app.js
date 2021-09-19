import '@/styles/global.css';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { SWRConfig } from 'swr';
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from 'next-themes';
import { StickyWaLink } from '@/components/StickyWaLink';
import axios from 'axios';

const fetcher = function(resource, init) {
  return axios(resource, init).then(({ data }) => {
    return data;
  });
};

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider attribute="class">
        <NextNProgress height={2} color="#209cee" />
        <Component {...pageProps} />
        <StickyWaLink />
      </ThemeProvider>
    </SWRConfig>
  );
}
export default App;
