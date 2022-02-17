import { createGraphQLRequest } from "./utils";

const request = createGraphQLRequest("https://api.github.com/graphql", {
  Authorization: "Bearer " + process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

export const githubGraphQLRequest = request;

export const getLatestUpdatedRepo = () =>
  request(
    `#graphql
    query {
      # User Repo
      viewer {
        repositories(
          first: 10
          isFork: false
          orderBy: {direction: DESC, field: PUSHED_AT}
        ) {
          nodes {
            nameWithOwner
            description
            forkCount
            stargazerCount
          }
        }
      }
    }
    `,
    {}
  ).then((data) => data?.viewer?.repositories?.nodes);
