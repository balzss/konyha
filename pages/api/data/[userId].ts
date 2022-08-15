import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma-client';

type ResponseData = {
  message: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const options = {
    where: {
      publishid: req.query.userId as string,
    }
  };
  const user = await prisma.user.findUnique(options);

  if (!user?.id) {
    res.status(404).json({ message: 'User not found' });
  }

  const dataOptions = {
    include: {tags: true},
    where: {
      authorId: user.id,
    }
  };
  const recipes = await prisma.recipe.findMany(dataOptions);

  res.status(200).json({ user, recipes });
};
