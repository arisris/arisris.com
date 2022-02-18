require("dotenv/config");

module.exports = {
  projects: {
    github: {
      schemaPath: "https://api.github.com/graphql",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      },
      includes: ["./lib/github.ts"]
    }
    /** End Datastax */
  }
};
