import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        clientId: process.env.GITHUB_CLIENT_ID
      })
    ],
    secret: process.env.APP_SECRET_KEY
  });
}
