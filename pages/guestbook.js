import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { FaRedo, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import {
  GITHUB_LOGIN_URL,
  useDeleteGuestbookMutation,
  useDeleteSessionMutation,
  usePostGuestbookMutation,
  useCheckSessionQuery,
  useGetGuestbookQuery,
  useLazyGetGuestbookQuery
} from '@/redux/store';
import clsx from 'clsx';

const SpinLoading = ({text}) => (
  <div className="flex justify-center items-center gap-2"><FaRedo className="w-4 h-4 animate-spin" /> <span>{text}</span></div>
);

const GbPost = ({
  name,
  website,
  body,
  created_at,
  avatar,
  login,
  gid,
  private: isPrivate,
  ...props
}) => {
  if (!created_at) created_at = Date.now(); // fallback
  const dt = new Date(created_at).toLocaleString();
  const { data: session } = useCheckSessionQuery();
  const [ deleteGuestbook, { isLoading: deletingGuestbook } ] = useDeleteGuestbookMutation();

  const isAdmin = session?.user?.login === "arisris";

  return (
    <div className="px-3 py-1 mb-2 bg-gray-50 dark:bg-black dark:border dark:border-gray-900 rounded-md border">
      <div className="grid grid-cols-2 gap-2 py-2 mb-2 border-b border-gray-200 dark:border-gray-900">
        <div className="inline-flex gap-2 items-center">
          <Image
            className="w-6 h-6 rounded-full"
            width="24"
            height="24"
            src={avatar}
          />
          <a
            href={website}
            target="__blank"
            className="text-md"
          >
            <p>{name}</p>
            <span className="text-[10px] text-gray-500">@{login}</span>
          </a>
        </div>
        <div className="flex flex-col gap-1 items-end justify-start text-[10px]">
          <div>{dt}</div>
          {isPrivate && <div className="text-red-500">(private)</div>}
          {/* Allow Author or admin to delete their comments */}
          { session
            && (session?.user?.login === login || isAdmin)
            && (
              <button title="Delete Comment?" onClick={() => deleteGuestbook(gid)}>
                <FaTrash className="w-3 h-3" />
              </button>
            )
          }
        </div>
      </div>
      <div className={clsx("my-4 text-gray-600 dark:text-gray-100 text-sm whitespace-pre-wrap", {
        "line-through text-red-500 dark:text-red-500": deletingGuestbook
      })}>
        {body}
      </div>
    </div>
  );
};

function GbList() {
  const { isLoading, isError, isFetching, data } = useGetGuestbookQuery();
  
  if (isLoading) return <SpinLoading text="Loading..." />;
  if (isError) return <div>{"Error While Loading Data"}</div>;
  if (isFetching) return <SpinLoading text="Fetching data..." />;
  return data?.data?.length > 0 ? data?.data?.map((i) => {
    return <GbPost key={i.key} gid={i.key} {...i} />;
  }) : <div>No comments yet.</div>;
}

function GbForms() {
  const [messageBody, setMessageBody] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { data: session, isLoading: loadingSession } = useCheckSessionQuery();
  const [ deleteSession ] = useDeleteSessionMutation();
  const [ postGuestbook, { isLoading: isUpdating } ] = usePostGuestbookMutation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    postGuestbook({ body: messageBody, private: isPrivate }).unwrap()
      .then(() => {
        setIsPrivate(false);
        setMessageBody('');
      });
  };
  if (loadingSession) return <SpinLoading text="Loading session" />;
  if (!session?.success) {
    return (
      <div className="mt-4 p-2 ring-1 ring-red-600 text-red-500 rounded text-xs">
        You must{' '}
        <a
          href={GITHUB_LOGIN_URL}
          target="_blank"
          className="font-black text-gray-600 dark:text-gray-200"
        >
          Login With Github
        </a>{' '}
        to leave a comments
      </div>
    );
  }
  return (
    <>
      <div className="mt-4 p-2 ring-1 ring-green-700 rounded text-xs">
        Logged as{' '}
        <b className="text-green-600">{session?.user?.login}</b>{' '}
        <a
          href="#"
          title="SignOut?"
          className="inline-flex font-black"
          onClick={(e) => {
            e.preventDefault();
            deleteSession();
          }}
        >
          <FaSignOutAlt className="w-3 h-3" />
        </a>
      </div>
      <form className="mt-4" method="POST" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>{`Your Message* (3 >= 100)`}</label>
          <textarea
            className="w-full h-32 p-2 rounded bg-gray-200 dark:bg-gray-700 focus:ring focus:outline-none mt-3"
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
            className="w-full px-2 py-1 rounded text-gray-100 bg-gray-800 hover:bg-gray-900 focus:ring"
            disabled={isUpdating}
          >
            {isUpdating ? "Submiting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default function GuestbookPage() {
  const [ reloadGuestbook, { isFetching: reloadingGuestbook } ] = useLazyGetGuestbookQuery();
  return (
    <Layout
      title="Guestbook"
      withHero={{
        title: 'Guestbook',
        subtitle: 'Leave your comments about my self or this site.'
      }}
    >
      <div className="flex flex-col lg:flex-row px-3 py-2 gap-16">
        <div className="w-12/12 lg:w-7/12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">Latest Guest Comments</h2>
            <button
              className="p-2 bg-gray-800 text-white rounded-full"
              onClick={(_) => reloadGuestbook()}
            >
              <FaRedo className={clsx("w-4 h-4", { 'animate-spin': reloadingGuestbook})} />
            </button>
          </div>
          <GbList />
        </div>
        <div className="w-12/12 lg:w-5/12">
          <GbForms />
        </div>
      </div>
    </Layout>
  );
}
