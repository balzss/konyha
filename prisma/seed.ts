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

  // await prisma.recipe.create({
  //   data: {
  //     name: 'Egy Recept',
  //     slug: 'egy-recept',
  //     description: 'd d',
  //     ingredients: 'egy,ketto',
  //     instructions: 'egyik,masik',
  //     authorId: firstUser.id,
  //     tags: {
  //       create: [
  //         {
  //           name: 'egyikTag',
  //           ownerId: firstUser.id,
  //         },
  //         {
  //           name: 'megegy tag',
  //           ownerId: firstUser.id,
  //         },
  //       ]
  //     }
  //   }
  // });

  await prisma.recipe.create({
    data: {
      name: 'kettes Recept',
      slug: 'ket-recept',
      description: 'd d',
      ingredients: '',
      instructions: '',
      authorId: firstUser.id,
      tags: {
        create: [
          {
            name: 'uj tag',
            ownerId: firstUser.id,
          },
          {
            name: 'megujjabb tagg',
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
