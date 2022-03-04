import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";

dotenv.config();

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors());
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });



  await server.start();

  server.applyMiddleware({ app });

  const CONN = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

  try {
    console.info("Connecting to MongoDB...");
    await mongoose.connect(CONN, { useNewUrlParser: true, useUnifiedTopology: true });
    console.info("Connected to MongoDB");
  } catch (error) {
    console.log(CONN)
    console.error("Error connecting to MongoDB", error);
  }

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
