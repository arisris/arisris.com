import { deta } from "lib/deta";
import { withSession } from "lib/utils";
import { NextApiHandler } from "next";
import { z } from "zod";

const ADMIN_USER = process.env.GITHUB_EMAIL;
const DB = deta.Base("guestbook");

const handleGet: NextApiHandler = async (req, res) => {
  const currentUser = req.session?.user;
  const query: Record<any, any> = {};
  if (currentUser?.email !== ADMIN_USER) {
    query.private = false;
  }
  const { items: data, last } = await DB.fetch(query, { limit: 100 });

  // remove last comment to ensure db not grow size
  if (last) await DB.delete(last);
  // display new comment frist by created_at
  let sortedData = data
    .sort(
      (a, b) =>
        new Date(b.created_at as any).valueOf() -
        new Date(a.created_at as any).valueOf()
    )
    .reduce((a, b) => {
      if (currentUser?.email !== ADMIN_USER) delete b.email;
      a.push(b);
      return a;
    }, []);

  return res.json({ success: true, data: sortedData });
};
const handlePost: NextApiHandler = async (req, res) => {
  const currentUser = req.session?.user;
  if (!currentUser) throw new Error("You are not loggedIn");
  const schema = z.object({
    private: z.boolean().default(false),
    body: z.string().min(3).max(100)
  });
  const value = await schema.parseAsync(req.body);
  await DB.put({
    ...value,
    name: currentUser.name,
    email: currentUser?.email,
    image: currentUser?.image,
    created_at: Date.now()
  });
  res.json({
    success: true,
    msg: "Thanks for your comments."
  });
};
const handleDelete: NextApiHandler = async (req, res) => {
  const currentUser = req.session?.user;
  try {
    if (!currentUser || !req.body?.key) throw Error;
    const comment = await DB.get(req.body?.key);
    if (
      comment?.email === currentUser?.email ||
      currentUser?.email === ADMIN_USER
    ) {
      await DB.delete(req.body?.key);
      return res.json({ success: true, msg: "Message deleted..." });
    }
    throw Error;
  } catch (e) {
    throw new Error("No message are deleted");
  }
};
export default withSession(async function (req, res) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      return res.json({ success: false, msg: "No Method allowed." });
  }
});
