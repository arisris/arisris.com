module.exports = {
  projects: {
    github: {
      schemaPath: "./data/github-schema.docs.graphql",
      includes: ["./lib/github.ts"]
    },
    nexusapp: {
      schemaPath: "./data/nexus/schema.graphql",
      url: "http://localhost:3000/api/graphql",
      includes: ["./lib", "./pages/**/*.{ts,tsx}"]
    }
  }
};
