import NextAuth, { Account } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { compare } from "bcryptjs";
import { Role } from "lib/enums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "john.doe@example.net"
          },
          password: {
            label: "Password",
            type: "Password",
            placeholder: "Password"
          }
        },
        authorize: async (cred) => {
          try {
            const user = await prisma.user.findUnique({
              where: { email: cred?.email }
            });
            if (!user) return null;
            const isValid = await compare(
              cred?.password as string,
              user?.password as string
            );
            if (!isValid) return null;
            return user;
          } catch (e) {
            return null;
          }
        }
      }),
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      })
    ],
    callbacks: {
      async signIn(args) {
        if (args.account.type === "credentials") return true;
        if (
          args.account.type === "oauth" &&
          args.user.email &&
          args.user.name
        ) {
          if (args.account.provider !== "github") return false; // only github for now

          // check existing user
          const existingUser = await prisma.user.findFirst({
            where: {
              accounts: {
                some: {
                  provider: args.account.provider,
                  providerAccountId: args.account.providerAccountId
                }
              }
            },
            include: {
              accounts: true
            }
          });

          if (existingUser) {
            // user exists now check token is same or not: if not same update them
            //console.log("User exists:")
            if (
              !existingUser.accounts.some(
                (acc) => acc.access_token === args.account.access_token
              )
            ) {
              //console.log("Updating token")
              let {
                access_token,
                expires_at,
                refresh_token,
                refresh_token_expires_in
              } = args.account;
              await prisma.user.update({
                where: {
                  id: existingUser.id
                },
                data: {
                  accounts: {
                    updateMany: {
                      where: {
                        userId: existingUser.id,
                        providerAccountId: args.account.providerAccountId
                      },
                      data: {
                        access_token,
                        expires_at,
                        refresh_token,
                        refresh_token_expires_in:
                          refresh_token_expires_in as number
                      }
                    }
                  }
                }
              });
            }
            return true;
          }

          // create new user if not exists
          let { userId, ...payload } = args.account;
          const newUser = await prisma.user.create({
            data: {
              name: args.user.name,
              role: Role.USER,
              image: args.user.image,
              email: args.user.email,
              accounts: {
                create: payload
              }
            }
          });
          if (newUser) return true;
        }
        return false;
      }
    },
    secret: process.env.APP_SECRET_KEY
  });
}
