import { deta } from "lib/deta";
import { RestApiError } from "lib/errors";
import { withSession } from "lib/utils";
import { NextApiHandler } from "next";

const gh_account = deta.Base("gh_account");
const handleGet: NextApiHandler = async (req, res) => {
  const currentUser = req.session?.user;
  if (currentUser && req.query.param === "currentUser") {
    const account = await gh_account.get(currentUser?.email);
    if (!!account) return res.json(account);
    throw new RestApiError("UNAUTHORIZED");
  }
  throw new RestApiError("NOT_FOUND");
};

export default withSession(async function (req, res) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    default:
      return res.json({ success: false, msg: "No Method allowed." });
  }
});
