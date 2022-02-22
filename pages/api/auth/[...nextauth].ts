import { ObjectType } from "deta/dist/types/types/basic";
import { deta } from "lib/deta";
import _ from "lodash";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const gh_account = deta.Base("gh_account");

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account.type === "oauth") {
        if (account.provider === "github" && user.email) {
          //console.log("Is checking github account.");
          const currentAccount = await gh_account.get(user?.email);
          if (!!currentAccount) {
            await gh_account.update(account as ObjectType, user?.email);
          } else {
            const _obj: ObjectType = {
              key: user.email,
              login: (profile?.login as string) || "",
              ...account
            };
            await gh_account.insert(_obj);
          }
          return true;
        }
        return true;
      }
      return false;
    }
  }
});
