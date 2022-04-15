// for get request
export type RecipeRequest = {
  attributes: Omit<Recipe, 'tags'> & { tags: { data: TagRequest[] } };
  id: string;
}

// for displaying
export type Recipe = {
  id: string;
  name: string;
  slug: string;
  ingredients: string[];
  instructions: string[];
  tags: string[],
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

export type User = {
  id: string;
  email: string;
}

export type UserState = {
  user: User | undefined;
  loggedIn: boolean;
  status: string;
  error: string;
}

export type LoginData = {
  identifier: string;
  password: string;
}
