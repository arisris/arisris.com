import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";

export const random = function() {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const GUID = function(max = 40) {
  var str = '';
  for (var i = 0; i < max / 3 + 1; i++) str += random();
  return str.substring(0, max);
};

export const restAsyncHandler =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  (req: NextApiRequest, res: NextApiResponse) =>
    handler(req, res).catch((e: Error | string) => {
      if (e instanceof ZodError) {
        return res.status(409).json({
          success: false,
          type: "validationError",
          path: e.name,
          errors: e.errors
        });
      }
      if (typeof e === "string") e = new Error(e);
      res.json({ success: false, msg: e.message });
    });

export const withSession = (handler: NextApiHandler) =>
  restAsyncHandler(async (req, res) => {
    const session = await getSession({ req });
    req.session = session;
    return handler(req, res);
  });