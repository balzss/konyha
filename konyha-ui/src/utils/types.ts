export type Recipe = {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
};

export type RawRecipe = {
  recipeName: string;
  description?: string | undefined;
  ingredients: string;
  instructions: string;
  tags?: string[] | undefined;
  newTag?: string | undefined;
};
