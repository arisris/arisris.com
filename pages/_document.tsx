import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <meta
            name="google-site-verification"
            content="HqRlPHb6rKQHLdM0ifiL0wHexR1qaUVFr_5f0dr0bKI"
          />
          {/* WhY?: Alternative to google analytics help me to improve my site. Use self hosted umami writen in next.js hosted at vercel with planetscale serverless MySQL database. Its safe just me can control this */}
          {process.env.NODE_ENV === "production" && (
            <script
              async
              defer
              data-website-id="11ffac4d-485a-45c7-a0fd-3d0a624ce238"
              src="https://umamiapp.vercel.app/umami.js"
            ></script>
          )}
        </Head>
        <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
