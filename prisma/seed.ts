import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const firstUser = await prisma.user.upsert({
    where: {
      email: 'user2@example.com',
    },
    update: {
      email: 'user2@example.com',
    },
    create: {
      email: 'user2@example.com',
    },
  });

  await prisma.recipe.create({
    data: {
      name: 'seeded recipes 1',
      slug: 'seeded-recipe1',
      description: 'this recipe was programatically generated',
      ingredients: [],
      instructions: [],
      authorId: firstUser.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
