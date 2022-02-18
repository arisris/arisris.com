import { createGraphQLRequest, gql } from "./utils";
const endpoints = "https://api.github.com/graphql";

export const authorizedGraphqlRequest = createGraphQLRequest(endpoints, {
  Authorization: "Bearer " + process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

export const getLatestUpdatedRepo = () =>
  authorizedGraphqlRequest(
    gql`
      #graphql
      query {
        # User Repo
        viewer {
          repositories(
            first: 10
            isFork: false
            orderBy: { direction: DESC, field: PUSHED_AT }
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

  export const getDiscussion = (number: number) =>
  authorizedGraphqlRequest(
    gql`
      #graphql
      query getDiscussion($number: Int!) {
        viewer {
          repository(name: "arisris.vercel.app") {
            discussion(number: $number) {
              id
              body
              publishedAt
              comments(first: 20) {
                edges {
                  node {
                    id
                    author {
                      login
                      avatarUrl
                      url
                    }
                    body
                    publishedAt
                  }
                }
              }
            }
          }
        }
      }
    `,
    { number }
  ).then((data) => data?.viewer?.repository?.discussion);