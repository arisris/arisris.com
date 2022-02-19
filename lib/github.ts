import { createGraphQLRequest, gql } from "./utils";
const endpoints = "https://api.github.com/graphql";

export const personalGithubRequest = createGraphQLRequest(endpoints, {
  Authorization: "Bearer " + process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

export const getLatestUpdatedRepo = () =>
  personalGithubRequest(
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
  personalGithubRequest(
    gql`
      #graphql
      query getDiscussion($number: Int!) {
        viewer {
          repository(name: "arisris.vercel.app") {
            discussion(number: $number) {
              number
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

export const getGistList = (first = 20, after = null) =>
  personalGithubRequest(
    gql`
      #graphql
      query getGistList($first: Int!, $after: String) {
        viewer {
          gists(
            first: $first
            after: $after
            privacy: PUBLIC
            orderBy: { direction: DESC, field: CREATED_AT }
          ) {
            totalCount
            nodes {
              name
              description
              stargazers {
                totalCount
              }
              forks {
                totalCount
              }
              files {
                extension
                name
              }
              createdAt
              updatedAt
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
      }
    `,
    { first, after }
  ).then((data) => data?.viewer?.gists);

export const getGistDetail = ({ id }: { id: string }) =>
  personalGithubRequest(
    gql`
      #graphql
      query getGistDetail($id: String!) {
        viewer {
          gist(name: $id) {
            name
            description
            owner {
              login
              avatarUrl
              url
            }
            isPublic
            stargazerCount
            forks {
              totalCount
            }
            updatedAt
            createdAt
            comments(first: 10) {
              totalCount
              # nodes {
              #   author {
              #     avatarUrl
              #     login
              #     url
              #   }
              #   body
              #   createdAt
              #   updatedAt
              # }
              # pageInfo {
              #   hasNextPage
              #   endCursor
              # }
            }
            files {
              text
              isImage
              extension
              size
              name
              language {
                name
                color
              }
            }
          }
        }
      }
    `,
    { id }
  ).then((data) => data?.viewer?.gist);
