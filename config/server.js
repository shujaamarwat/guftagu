// Imports the necessary packages.
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFile } from "fs/promises";
import { createServer } from "http";
import { resolvers } from "./resolvers.js";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { getWSContext, app, getContext } from "./routes.js";

const PORT = 9000;

// Creates a WebSocket server.
const httpServer = createServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

// Reads the GraphQL schema from a file.
const typeDefs = await readFile("./schema.graphql", "utf8");

// Creates an executable schema from the GraphQL schema and resolvers.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Registers the WebSocket server with the GraphQL schema.
useServer({
  schema,
  context: getWSContext
}, wsServer);

// Creates an Apollo Server instance.
const apolloServer = new ApolloServer({
  schema,
  context: getContext,
});

// Starts the Apollo Server instance.
await apolloServer.start();

// Registers the Apollo Server instance with the Express application.
app.use("/graphql", expressMiddleware(apolloServer, { context: getContext }));

// Starts the Express application.
httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
