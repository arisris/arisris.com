import Document, { Html, Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Help me to analytics my site. use self hosted umami so just me can control this */}
          {process.env.NODE_ENV === 'production' && (
            <script
              async
              defer
              data-website-id="11ffac4d-485a-45c7-a0fd-3d0a624ce238"
              src="https://umamiapp.vercel.app/umami.js"
            ></script>
          )}
        </Head>
        <body className="bg-white dark:bg-black text-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
