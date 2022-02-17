import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
  sendResult
} from "graphql-helix";
import { withSession } from "lib/utils";
import { NextApiHandler } from "next";

const handlers: NextApiHandler = async (req, res) => {
  const schema = await import("lib/schemas/schema").then((m) => m.default);
  const request = {
    body: req.body || {},
    headers: req.headers,
    method: req.method || "GET",
    query: req.query
  };
  if (shouldRenderGraphiQL(request))
    return res.send(
      renderGraphiQL({
        endpoint: "/api/graphql"
      })
    );
  const { operationName, query, variables } = getGraphQLParameters(request);
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
    contextFactory: () => ({ session: req.session })
  });
  sendResult(result, res);
};

export default withSession(handlers);
