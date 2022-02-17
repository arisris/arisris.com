import { RestApiError } from "lib/errors";
import {
  createGuestbook,
  deleteGuestbook,
  getAllGuestbook,
  updateGuestbook
} from "lib/fauna";
import { withSession } from "lib/utils";
import { NextApiHandler } from "next";

const apiHandler: NextApiHandler = async (req, res) => {
  const currentUser = req.session?.user;
  const query = req.query;
  const body = req.body;

  // todo logic
  switch (req.method) {
    case "GET":
      let allGuestbook = await getAllGuestbook(20);
      return res.json(allGuestbook);
    case "POST":
      if (!currentUser) throw new RestApiError("UNAUTHORIZED");
      if (query.id) {
        if (!currentUser?.isAdmin) throw new RestApiError("UNAUTHORIZED");
        let updatedGuestbook = await updateGuestbook(query.id as string, body);
        return res.json(updatedGuestbook);
      }
      let createdGuestbook = await createGuestbook(body);
      return res.json(createdGuestbook);
    case "DELETE":
      if (!body.id) throw new RestApiError("PRECODITION_FAILED");
      let deletedGuestbook = await deleteGuestbook(body.id);
      return res.json(deletedGuestbook);
    default:
      throw new RestApiError("METHOD_NOT_SUPPORTED");
  }
};

export default withSession(apiHandler);
