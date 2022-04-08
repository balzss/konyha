// for get request
export type RecipeRequest = {
  attributes: Recipe | { tags: any };
  id: string;
}

// for displaying
export type Recipe = {
  name: string;
  image: string;
  id: string;
  ingredients: string[];
  instructions: string[];
  tags: Tag[],
  description?: string;
};

// for editing
export type RawRecipe = {
  recipeName: string;
  description?: string | undefined;
  ingredients: string;
  instructions: string;
  tags?: string[] | undefined;
  newTag?: string | undefined;
};

// for redux
export type RecipeState = {
  recipes: Recipe[],
  status: string;
  error: string;
};

export type TagRequest = {
  attributes: Tag;
  id: string;
};

export type Tag = {
  id: string;
  name: string;
}

export type TagState = {
  tags: Tag[],
  status: string;
  error: string;
};
