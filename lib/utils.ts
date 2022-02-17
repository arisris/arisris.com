import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";

export const random = function () {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const GUID = function (max = 40) {
  var str = "";
  for (var i = 0; i < max / 3 + 1; i++) str += random();
  return str.substring(0, max);
};

export const createGraphQLRequest =
  (baseUrl: string, headers: HeadersInit = {}) =>
  (
    query: string,
    variables: Record<string, any> = {},
    optionalHeadersOptions: HeadersInit = {}
  ) =>
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...{ ...headers, ...optionalHeadersOptions }
      },
      body: JSON.stringify({ query, variables })
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.data) return { error: true, message: "No data!", json };
        return json.data;
      })
      .catch((e) => ({ error: true, message: e.message }));

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
    req.session = await getSession({ req });
    return handler(req, res);
  });
