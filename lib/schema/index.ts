import { fieldAuthorizePlugin, makeSchema, objectType } from "nexus";
import { buildSchema } from "graphql";
import path from "path";
import * as FreeTemplate from "./FreeTemplate";
import * as Guestbook from "./Guestbook";
import { gql } from "lib/utils";

const rootSchema = buildSchema(gql`
  type PaginatedResponse {
    total: Int
    totalPage: Int
    prevPage: Int
    nextPage: Int
  }
`);

export default makeSchema({
  mergeSchema: { schema: rootSchema },
  types: [Guestbook, FreeTemplate],
  outputs: {
    typegen: path.join(process.cwd(), "/data/nexus/type.ts"),
    schema: path.join(process.cwd(), "/data/nexus/schema.graphql")
  },
  contextType: {
    module: path.join(process.cwd(), "/types/module.d.ts"),
    export: "GraphQLContextType"
  },
  plugins: [fieldAuthorizePlugin()]
});
