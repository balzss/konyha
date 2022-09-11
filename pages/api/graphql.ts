import path from 'path';
import { readFileSync } from 'fs';
import Cors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/react';
import prisma from '../../prisma/prisma-client';
import resolvers from '../../graphql/resolvers';

const typeDefs = readFileSync(path.resolve('./graphql', 'schema.graphql'), 'utf8');
const cors = Cors();
const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  debug: process.env.NODE_ENV === 'development',
  context: async function createContext({ req }) {
    const session = await getSession({ req });
    return {
      prisma,
      session,
    };
  },
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
