import { PrismaClient } from "@prisma/client";
import { NextComponentType, NextPageContext, NextApiRequest } from "next";
import { DefaultUser, Session, UserData } from "next-auth";
import { Router } from "next/router";

declare module "next-auth" {
  interface UserData extends DefaultUser {
    isAdmin?: boolean;
  }
  interface Session {
    user?: UserData;
  }
}

declare module "next/app" {
  type NextComponentTypeWithProps<P = Record<string, unknown>> =
    NextComponentType<NextPageContext, any, P> & {
      protected?: any;
    };
  export type AppProps<P = Record<string, any>> = {
    Component: NextComponentTypeWithProps;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      session?: Session;
    };
  };
}

declare module "next" {
  interface NextApiRequest extends NextApiRequest {
    session: Session;
  }
}
export type GraphQLContextType = {
  req: NextApiRequest;
};
