import { NextApiHandler } from "next";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL
} from "graphql-helix";
import schema from "lib/schema";
import { withSession } from "lib/utils";
import { GraphQLContextType } from "types/module";

const handler: NextApiHandler = async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query
  };
  if (shouldRenderGraphiQL(request)) {
    if (process.env.NODE_ENV === "production")
      return res.json({ message: "Hello World" });
    return res.send(
      renderGraphiQL({
        endpoint: "/api/graphql"
      })
    );
  } else {
    // Extract the Graphql parameters from the request
    const { operationName, query, variables } = getGraphQLParameters(request);

    // Validate and execute the query
    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      contextFactory: (): GraphQLContextType => ({ req }),
      // @ts-ignore
      schema
    });
    return sendResult(result, res);
  }
};

export default withSession(handler);
