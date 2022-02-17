import { useRequest } from "ahooks";
import { useState } from "react";

const guestbookApi = (init: RequestInit = {}) => (options = {}) => fetch("/api/guestbook", {
  method: init.method || "GET",
  body: init.body,
  headers: {
    "content-type": "application/json",
    ...init.headers
  }
}).then(res => res.json())

export function Guestbook() {
  const { data, loading } = useRequest(guestbookApi(), {
    defaultParams: []
  });
  console.log(data)
  return (
    <div className="p-2" id="guestbook">
      <h3 className="inline-flex border-b-4 text-2xl mb-6">Guestbook</h3>
      <div>// TODO</div>
    </div>
  );
}
