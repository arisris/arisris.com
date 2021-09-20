import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function Login() {
  return (
    <Layout>
      <div className="flex-auto flex justify-center items-center min-h-[360px]">
        <a href="/api/session" target="__blank" className="bg-gray-200 dark:bg-gray-900 dark:text-white px-3 py-2 rounded-md">Hii</a>
      </div>
    </Layout>
  );
}
