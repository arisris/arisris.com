import Link from "next/link";
import Head from "next/head";
export default function Error404() {
  return (
    <div className="absolute flex flex-col justify-center items-center w-full h-full">
      <Head>
        <title>404 Page Not Found</title>
      </Head>
      <div className="p-4 rounded shadow-md hover:shadow-xl">
        <h1 className="flex items-center text-6xl font-bold text-purple-900">
          404 <span className="ml-2 text-sm rounded-xl">Page Not Found</span>
        </h1>
      </div>
      <div className="text-center mt-4">
        <Link href="/">
          <a className="text-purple-900 text-sm ring p-1 ring-purple-900 hover:bg-purple-900 hover:text-white">
            Back To Home
          </a>
        </Link>
      </div>
    </div>
  );
}
