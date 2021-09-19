import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import useSWR from 'swr';

const GbPost = ({ name, website, body, created_at }) => {
  if (!created_at) created_at = Date.now(); // fallback
  const dt = new Date(created_at).toLocaleString();
  return (
    <div className="px-3 py-1 mb-2 bg-gray-50 dark:bg-black dark:border dark:border-gray-900 shadow-sm rounded-md">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between py-2 mb-2 border-b dark:border-gray-900">
        <div>
          <a href={website} target="__blank" className="text-xl">
            {name}
          </a>
        </div>
        <div>{dt}</div>
      </div>
      <div className="mt-4">{body}</div>
    </div>
  );
};

function GbList() {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWR(`/api/guestbook?page=${pageIndex}`);
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error While Loading data</div>;

  return data.data.map((i) => {
    return <GbPost key={i._key} {...i} />;
  });
}
function GbForms() {
  const { resolvedTheme } = useTheme();
  if (true) return <div>Currently Disabled</div>;
  return (
    <form method="POST" action={`/api/guestbook`}>
      <h4>All field is required*</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="mb-2">
          <input
            className="w-full px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 focus:ring focus:outline-none"
            type="text"
            name="name"
            placeholder="Name*"
          />
        </div>
        <div className="mb-2">
          <input
            className="w-full px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 focus:ring focus:outline-none"
            type="email"
            name="email"
            placeholder="Email*"
          />
        </div>
      </div>
      <div className="mb-2">
        <input
          className="w-full px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 focus:ring focus:outline-none"
          type="text"
          name="website"
          placeholder="Website*"
        />
      </div>
      <div className="mb-2">
        <label>Your Message* (max: 100 char)</label>
        <textarea
          className="w-full h-32 px-2 rounded bg-gray-200 dark:bg-gray-700 focus:ring focus:outline-none"
          name="body"
          placeholder="Leave your message here."
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" name="private" />
          <span className="ml-4 select-none">Your comments is private?</span>
        </label>
      </div>
      <div className="mb-4">
        <div></div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-2 py-1 rounded text-white bg-purple-800 hover:bg-purple-900 dark:bg-gray-800 dark:hover:bg-gray-900 focus:ring"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default function GuestbookPage() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <Layout
      withHero={{
        title: 'My Guestbook',
        subtitle: 'Its Currently in development'
      }}
    >
      <Head>
        <title>Guestbook Page</title>
      </Head>
      <div className="flex flex-col px-3 py-2 max-w-[640px] m-auto">
        <GbList />
        <a
          href="#"
          className="flex justify-between items-center text-lg focus:ring-2 focus:rounded focus:px-2"
          onClick={(e) => {
            e.preventDefault();
            setOpenForm(!openForm);
          }}
        >
          <span># Leave a Comments</span>

          <div>{openForm ? <FaCaretUp /> : <FaCaretDown />}</div>
        </a>
        {openForm && <GbForms />}
      </div>
    </Layout>
  );
}
