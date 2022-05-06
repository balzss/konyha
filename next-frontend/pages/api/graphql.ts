import 'reflect-metadata';
import { createServer } from '@graphql-yoga/node';
import { NextApiRequest, NextApiResponse } from 'next';
import { resolvers } from '@generated/type-graphql';
import { buildSchemaSync } from 'type-graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: buildSchemaSync({ resolvers }),
  context: () => ({ prisma }),
});

export default server;
