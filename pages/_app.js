import '@/styles/global.css';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { SWRConfig } from 'swr';
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from 'next-themes';
import { StickyWaLink } from '@/components/StickyWaLink';
import fetchs from 'fetch-s';

const fetcher = function(resource, init) {
  return fetchs.request(resource, init).then(({ data }) => {
    return data;
  });
};

function App({ Component, pageProps }) {
  const waRef = useRef();
  const onDrag = (e) => {
    console.log(e);
  };
  useEffect(() => {
    if (waRef.current) {
      waRef.current.addEventListener('touchmove', onDrag);
      return () => {
        waRef.current.removeEventListener('touchmove', onDrag);
      };
    }
  }, [waRef]);
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
