import { PrismaClient } from "@prisma/client";
import { DefaultUser, Session, UserData } from "next-auth";

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
  type AppProps = {
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
    session: Session | null;
  }
}