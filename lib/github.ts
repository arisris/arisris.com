const request = (query: string, variables: Record<any, any>) =>
  fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      Authorization: "Bearer " + process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    }
  })
    .then((res) => res.json())
    .catch((e) => ({ error: true, message: e.message }));

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
  ).then((json) => json.data.viewer.repositories.nodes);
