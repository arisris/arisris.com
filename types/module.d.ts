import { DefaultUser, Session, UserData } from "next-auth";

declare module "next-auth" {
  interface UserData extends DefaultUser {
    isAdmin?: boolean;
  }
  interface Session {
    user?: UserData;
  }
}

declare module "next" {
  interface NextApiRequest extends NextApiRequest {
    session: Session | null;
  }
}