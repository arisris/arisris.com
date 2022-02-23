import { fieldAuthorizePlugin, makeSchema, objectType } from "nexus";
import path from "path";
import Guestbook from "./Guestbook";

export default makeSchema({
  types: [Guestbook],
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
