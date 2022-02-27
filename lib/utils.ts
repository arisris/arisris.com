import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";
import { RestApiError, REST_API_ERROR_TYPE } from "./errors";

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

export const canUseWindow = (property?: string) => {
  const isBrowser = !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
  if (property) return isBrowser && typeof window[property] !== "undefined";
  return isBrowser;
};

export function friendlyDate(str: string) {
  const date = new Date(Date.parse(str));
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const day = date.getDay() === 0 ? 1 : date.getDay();
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function timeAgo(
  timestamp: Date | number,
  options: {
    format: "medium" | "long" | "short";
  } = { format: "medium" }
) {
  const ranges = [
    { min: 1, max: 60, name: { short: "s", medium: "sec", long: "second" } },
    { max: 3600, name: { short: "m", medium: "min", long: "minute" } },
    { max: 86400, name: { short: "h", medium: "hr", long: "hour" } },
    { max: 86400 * 7, name: { short: "d", medium: "day", long: "day" } },
    { max: 86400 * 28, name: { short: "w", medium: "wk", long: "week" } },
    {
      min: 86400 * 31,
      max: 86400 * 365,
      name: { short: "m", medium: "mon", long: "month" }
    },
    { max: 86400 * 365 * 100, name: { short: "y", medium: "yr", long: "year" } }
  ];

  let ts_diff: number;
  const now_ms = new Date().getTime();

  if (timestamp instanceof Date) {
    ts_diff = (now_ms - timestamp.getTime()) / 1000;
  } else {
    ts_diff = now_ms / 1000 - timestamp;
  }

  const index = ranges.findIndex((item) => item.max > ts_diff);
  const range = ranges[index];
  const prevIndex = index - 1;
  const min = range.min || ranges[prevIndex].max;
  const diff = Math.ceil(ts_diff / min);

  if (diff < 0)
    throw new Error(
      "The time difference is negative. The provided timestamp is in the future."
    );

  const plural = diff > 1 && options.format !== "short" ? "s" : "";

  return `${diff}${options.format === "short" ? "" : " "}${
    range.name[options.format]
  }${plural} ago`;
}

export const noop = () => {};

export function site_url(path: string) {
  if (typeof window !== "undefined") {
    return path;
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${path}`;
  }
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export const fakeArray = (size = 1) =>
  Array(size)
    .fill(null)
    .map((_, k) => k);

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
    handler(req, res).catch((e: Error | RestApiError | string) => {
      if (e instanceof ZodError) {
        return res.status(409).json({
          success: false,
          type: "validationError",
          path: e.name,
          errors: e.errors
        });
      }
      const obj = {};
      if (e instanceof RestApiError) {
        Object.assign(obj, {
          code: e.code
        });
      }
      if (typeof e === "string") e = new Error(e);
      res.json({
        success: false,
        msg: e.message || "Something went wrong!",
        ...obj
      });
    });

export const withSession = (handler: NextApiHandler) =>
  restAsyncHandler(async (req, res) => {
    req.session = await getSession({ req });
    return handler(req, res);
  });
