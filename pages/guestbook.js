import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { FaCaretDown, FaCaretUp, FaRedo, FaSignOutAlt } from 'react-icons/fa';
import { useStoreon } from 'storeon/react';

const GbPost = ({ name, website, body, created_at }) => {
  if (!created_at) created_at = Date.now(); // fallback
  const dt = new Date(created_at).toLocaleString();
  return (
    <div className="px-3 py-1 mb-2 bg-gray-50 dark:bg-black dark:border dark:border-gray-900 shadow-sm rounded-md shadow-md">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between py-2 mb-2 border-b border-gray-200 dark:border-gray-900">
        <div>
          <a
            href={website}
            target="__blank"
            className="text-md text-purple-800 dark:text-blue-400"
          >
            {name}
          </a>
        </div>
        <div className="text-xs">{dt}</div>
      </div>
      <div className="mt-4 text-gray-600 dark:text-gray-100 text-sm">
        {body}
      </div>
    </div>
  );
};

function GbList() {
  const {
    guestbook: { data, loading, error },
    dispatch
  } = useStoreon('guestbook');
  useEffect(() => {
    if (!data) {
      dispatch('guestbook/fetch');
    }
  }, []);
  if (loading) return <div>Loading</div>;
  if (error) return <div>{error.message}</div>;
  return data.map((i) => {
    return <GbPost key={i.created_at} {...i} />;
  });
}
function GbForms() {
  const [messageBody, setMessageBody] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { session, guestbook, dispatch } = useStoreon('session', 'guestbook');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch('guestbook/insert', { body: messageBody, private: isPrivate });
    setIsPrivate(false);
    setMessageBody('');
  };
  if (!session?.isLoggedIn) {
    return (
      <div className="mt-4 p-2 ring-1 ring-red-600 text-red-500 rounded">
        You must{' '}
        <a href="/api/session?login_type=github" className="font-black text-purple-700 dark:text-blue-400">login</a>{' '}
        to leave a comments
      </div>
    );
  }
  return (
    <>
      <div className="mt-4 p-2 ring-1 ring-green-600 rounded">
        Logged as <b className="text-green-500">{session.currentUser.login}</b>{' '}
        <a
          href="#"
          title="SignOut?"
          className="inline-flex font-black text-purple-700 dark:text-blue-400"
          onClick={(e) => {
            e.preventDefault();
            dispatch('session/logout');
          }}
        >
          <FaSignOutAlt className="w-3 h-3" />
        </a>
      </div>
      <form className="mt-4" method="POST" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Your Message* (max: 100 char)</label>
          <textarea
            className="w-full h-32 px-2 rounded bg-gray-200 dark:bg-gray-700 focus:ring focus:outline-none mt-3"
            name="body"
            placeholder="Leave your message here."
            onChange={(e) => setMessageBody(e.target.value)}
            value={messageBody}
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="private"
              onChange={(e) => setIsPrivate(e.target.checked)}
              value={isPrivate}
            />
            <span className="ml-4 select-none">Your comments is private?</span>
          </label>
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
    </>
  );
}

export default function GuestbookPage() {
  const { session, guestbook, dispatch } = useStoreon('guestbook', 'session');
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
      <div className="flex flex-col md:flex-row px-3 py-2 gap-16">
        <div className="w-12/12 md:w-7/12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">Latest Guest Comments</h2>
            <button
              className="p-2 bg-purple-700 dark:bg-gray-800 text-white rounded-full"
              onClick={(e) => {
                dispatch('guestbook/fetch');
              }}
            >
              <FaRedo className="w-4 h-4" />
            </button>
          </div>
          <GbList />
        </div>
        <div className="w-12/12 md:w-5/12">
          <GbForms />
        </div>
      </div>
    </Layout>
  );
}
