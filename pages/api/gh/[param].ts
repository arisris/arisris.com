import { RestApiError } from "lib/errors";
import { getDiscussion, getLatestUpdatedRepo } from "lib/github";
import { withSession } from "lib/utils";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") throw new RestApiError("METHOD_NOT_SUPPORTED");
  const param = req.query?.param;

  if (param === "guestbook") {
    let data = await getDiscussion(7);
    return res.json(data);
  }
  if (param === "updated-repo") {
    let data = await getLatestUpdatedRepo();
    return res.json(data);
  }

  throw new RestApiError("NOT_FOUND");
};

export default withSession(handler);
