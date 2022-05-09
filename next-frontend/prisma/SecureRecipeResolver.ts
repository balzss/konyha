import 'reflect-metadata';
import { Resolver, Query, Ctx } from 'type-graphql';
import { Recipe } from '@generated/type-graphql';

@Resolver()
export default class SecureRecipeResolver {
  @Query(() => Recipe, { nullable: true })
  async recipes(@Ctx() context: any): Promise<Recipe[]> {
    const recipes = await context.prisma.recipe.findMany({where: {authorId: context?.session?.userId}});
    console.log(recipes)
    return recipes;
  }
}
