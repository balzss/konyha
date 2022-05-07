import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const firstUser = await prisma.user.create({
    data: {
      email: 'user1@example.com',
    }
  });

  await prisma.recipe.create({
    data: {
      name: 'Egy Recept',
      slug: 'egy-recept',
      description: 'd d',
      ingredients: 'egy,ketto',
      instructions: 'egyik,masik',
      authorId: firstUser.id,
      tags: {
        create: [
          {
            name: 'egyikTag',
            ownerId: firstUser.id,
          },
          {
            name: 'megegy tag',
            ownerId: firstUser.id,
          },
        ]
      }
    }
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
