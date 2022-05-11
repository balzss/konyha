const p = require('@prisma/client')
const prisma = new p.PrismaClient();

async function main() {
  const recipes = await prisma.recipe.findMany()
  console.log(recipes)
}

main()
