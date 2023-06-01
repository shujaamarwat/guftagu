const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { readFile } = require("fs/promises");
const { createServer } = require("http");
const { resolvers } = require("./resolvers.js");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { getWSContext, app, getContext } = require("./routes.js");

const PORT = 9000;

const startServer = async () => {
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

  const typeDefs = await readFile("./schema.graphql", "utf8");

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  useServer(
    {
      schema,
      context: getWSContext,
    },
    wsServer
  );

  const apolloServer = new ApolloServer({
    schema,
    context: getContext,
  });

  await apolloServer.start();

  app.use("/graphql", expressMiddleware(apolloServer, { context: getContext }));

  httpServer.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => console.error(error));
