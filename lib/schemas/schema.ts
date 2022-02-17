import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLFieldResolver } from "graphql";
import { getAllGuestbook } from "lib/fauna";
import { Session } from "next-auth";

const typeDefs = `#graphql
  type Guestbook {
    _id: ID!
    email: String
    message: String
    createdBy: String
    createdAt: String
    updatedAt: String
  }
  
  input GuestbookInput {
    email: String
    message: String
    createdBy: String
  }
  type Query {
    getAllGuestbook: [Guestbook!]
    getOneGuestbook(id: ID!): Guestbook
  }
  type Mutation {
    createGuestbook(data: GuestbookInput!): Guestbook
    updateGuestbook(id: ID!, data: GuestbookInput!): Guestbook
    deleteGuestbook(id: ID!): Boolean!
  }
`;

type ResolversObjectType = Record<
  string,
  Record<
    string,
    GraphQLFieldResolver<any, { session: Session }, Record<any, any>>
  >
>;
const resolvers: ResolversObjectType = {
  Query: {
    getAllGuestbook: async (_root, _args, _ctx) => {
      const data = await getAllGuestbook();
      return data;
    },
    getOneGuestbook: async (_root, _args, _ctx) => {
      return null;
    }
  },
  Guestbook: {
    email: (_root, _args, ctx, { operation: { operation } }) => {
      if (operation === "query")
        return ctx.session?.user?.isAdmin ? _root.email : null;
      return _root.value;
    }
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
