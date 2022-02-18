import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const gql = (strs: TemplateStringsArray, ...vars: any[]) =>
  strs.reduce((a, b, c) => a.concat(b).concat(c in vars ? vars[c] : ""), "");

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
      if (typeof e === "string") e = new Error(e);
      res.json({ success: false, msg: e.message || "Something went wrong!" });
    });

export const withSession = (handler: NextApiHandler) =>
  restAsyncHandler(async (req, res) => {
    req.session = await getSession({ req });
    return handler(req, res);
  });
