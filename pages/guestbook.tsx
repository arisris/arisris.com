import { useState } from "react";
import Image from "next/image";
import Layout from "components/Layout";
import { FaRedo, FaSignOutAlt, FaTrash } from "react-icons/fa";
import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";
import { timeAgo } from "lib/utils";
import { SpinLoading } from "components/Utility";
import {
  useDestroyGuestbookMutation,
  useGetAllGuestbookQuery,
  useStoreGuestbookMutation
} from "lib/redux/guestbookApi";

const GbPost = ({ data, refresh }) => {
  if (!data?.created_at) data.created_at = new Date(); // fallback
  const timeagoDate = timeAgo(new Date(Number(data?.created_at)));
  const { data: session, status: sessionStatus } = useSession();
  const [destroyGuestbook, { isLoading: isDeleting }] =
    useDestroyGuestbookMutation();
  const isAdmin = sessionStatus === "authenticated" && session?.user?.isAdmin;
  const handleDelete = () => {
    destroyGuestbook(data.key).then(() => {
      refresh();
    });
  };
  return (
    <div className="px-3 py-1 mb-2 bg-gray-50 dark:bg-gray-900 dark:border-gray-800 rounded-md border">
      <div className="grid grid-cols-2 gap-2 py-2 mb-2 border-b border-gray-200 dark:border-gray-800">
        <div className="inline-flex gap-2 items-center">
          <Image
            className="w-6 h-6 rounded-full"
            width="24"
            height="24"
            src={data.image}
          />
          <div className="text-md flex flex-col">
            <h4>{data?.name}</h4>
            <span className="text-[10px] text-gray-500">{timeagoDate}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end justify-center text-[10px]">
          {data?.private && <div className="text-red-500">(private)</div>}
          {/* Fix Me: Allow Author or admin to delete their comments */}
          {session && (session?.user?.email === data?.email || isAdmin) && (
            <button title="Delete Comment?" onClick={handleDelete}>
              <FaTrash className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
      <div
        className={clsx(
          "my-4 text-gray-600 dark:text-gray-100 text-sm whitespace-pre-wrap",
          {
            "line-through text-red-500 dark:text-red-500": isDeleting
          }
        )}
      >
        {data?.body}
      </div>
    </div>
  );
};

function GbForms({ refresh }) {
  const [messageBody, setMessageBody] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const [storeGuestbook, { isLoading }] = useStoreGuestbookMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    storeGuestbook({
      body: messageBody,
      private: isPrivate
    }).then(() => {
      setIsPrivate(false);
      setMessageBody("");
      refresh();
    });
  };
  if (sessionStatus === "loading")
    return <SpinLoading text="Loading session" />;
  if (sessionStatus === "unauthenticated") {
    return (
      <div className="mt-4 p-2 ring-1 ring-red-600 text-red-500 rounded text-xs">
        You must{" "}
        <a
          href="#signIn"
          onClick={() => signIn()}
          className="font-black text-gray-600 dark:text-gray-200"
        >
          SignIn
        </a>{" "}
        to write a guestbook
      </div>
    );
  }
  return (
    <>
      <div className="inline-flex items-center gap-2 w-full mt-4 p-2 ring-1 ring-green-700 rounded text-xs">
        Logged as <b className="text-green-600">{session?.user?.name}</b>{" "}
        <a
          href="#signOut"
          title="SignOut?"
          className="inline-flex font-black"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <FaSignOutAlt className="w-3 h-3" />
        </a>
      </div>
      <form className="mt-4" method="POST" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>{`Your Message* (3 >= 100)`}</label>
          <textarea
            className="w-full h-auto p-4 rounded bg-gray-200 dark:bg-gray-900 border dark:border-gray-800 focus:ring focus:outline-none mt-3"
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
              checked={isPrivate}
            />
            <span className="ml-4 select-none">Your guestbook is private?</span>
          </label>
        </div>
        <div>
          <button
            type="submit"
            className={clsx(
              "w-full px-2 py-1 rounded text-gray-100 bg-gray-800 focus:ring",
              {
                "cursor-wait": isLoading
              }
            )}
            disabled={isLoading}
          >
            {isLoading ? "Submiting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default function GuestbookPage() {
  const { data, isFetching, error, refetch } = useGetAllGuestbookQuery(null);
  return (
    <Layout title="Guestbook">
      <div className="flex flex-col-reverse lg:flex-row px-3 py-2 gap-6">
        <div className="w-12/12 lg:w-7/12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">Latest Guestbook</h2>
            <button
              className="p-2 bg-gray-800 text-white rounded-full"
              onClick={() => refetch()}
            >
              <FaRedo
                className={clsx("w-4 h-4", {
                  "animate-spin": isFetching
                })}
              />
            </button>
          </div>
          {isFetching ? (
            <SpinLoading text="Loading..." />
          ) : error ? (
            <div>{"Error While Loading Data"}</div>
          ) : data?.length > 0 ? (
            data?.map((i: any) => {
              return <GbPost key={i.key} data={i} refresh={refetch} />;
            })
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
        <div className="w-12/12 lg:w-5/12">
          <GbForms refresh={refetch} />
        </div>
      </div>
    </Layout>
  );
}
