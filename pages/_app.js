import '@/styles/global.css';
import Image from 'next/image';
import { SWRConfig } from 'swr';
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from 'next-themes';

const fetcher = function(resource, init) {
  return fetch(resource, init).then((data) => data.json());
};

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider attribute="class">
        <NextNProgress height={2} color="#209cee" />
        <Component {...pageProps} />
        <a title="Chat with me" target="__blank" href="https://wa.me/6282240183482" className="fixed bottom-5 right-5 z-50 w-16 h-16 p-2">
          <Image width="100" height="100" src="/icons/whatsapp.png" />
        </a>
      </ThemeProvider>
    </SWRConfig>
  );
}
export default App;
