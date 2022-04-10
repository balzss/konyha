import { RawRecipe, RecipeRequest, Recipe, Tag } from './types';

const API_HOST = 'http://192.168.1.76:1337';

// transform recipe data before sending it to backend
function transformRawRecipe(rawRecipe: RawRecipe, newTagIds: string[]): Omit<Recipe, 'id'> {
  return {
    name: rawRecipe.recipeName.trim(),
    description: rawRecipe.description ? rawRecipe.description.trim() : '',
    image: '',
    ingredients: rawRecipe.ingredients.split('\n').map((ingredient) => ingredient.trim()),
    instructions: rawRecipe.instructions.split('\n').map((instruction) => instruction.trim()),
    tags: [...rawRecipe.tags || [], ...newTagIds],
  };
}

// transform recipe data after fetching it from backend
function transformRecipeRequest(recipeRequest: RecipeRequest): Recipe {
  const tagIds = recipeRequest.attributes.tags?.data.map((tag) => tag.id);
  return {
    ...recipeRequest.attributes,
    id: `${recipeRequest.id}`,
    tags: tagIds,
  };
}

export const getRecipes = async (): Promise<Recipe[]> => {
  return await fetch(`${API_HOST}/api/recipes?populate=tags`)
    .then((r) => r.json())
    .then(({data}: {data: RecipeRequest[]}) => {
      return data.map((requestItem) => transformRecipeRequest(requestItem));
    });
};

export const saveNewRecipe = async (rawRecipe: RawRecipe): Promise<Recipe> => {
  const formattedNewTags = rawRecipe.newTag?.split(',').map((tag) => tag.trim());
  const newTagIds = await createNewTags(formattedNewTags);
  const data = transformRawRecipe(rawRecipe, newTagIds);

  return await fetch(`${API_HOST}/api/recipes?populate=tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({data}),
  }).then((r) => r.json()).then(({data}) => transformRecipeRequest(data));
};

export const updateRecipe = async (rawRecipe: RawRecipe, recipeId: string): Promise<Recipe> => {
  // TODO remove unused tags like when deleting
  const formattedNewTags = rawRecipe.newTag?.split(',').map((tag) => tag.trim());
  const newTagIds = await createNewTags(formattedNewTags);
  const data = transformRawRecipe(rawRecipe, newTagIds);
  return await fetch(`${API_HOST}/api/recipes/${recipeId}?populate=tags`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({data}),
  }).then((r) => r.json()).then(({data}) => transformRecipeRequest(data));
}

export const deleteRecipe = async (recipeId: string) => {
  return await fetch(`${API_HOST}/api/recipes/${recipeId}?populate=tags`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json()).then(async ({data}) => {
    const tags = data.attributes.tags.data;
    return await Promise.all(tags.map(async (tag: Tag) => removeTagIfUnused(tag.id)));
  });
}

const createNewTags = async (newTags: string[] = []): Promise<string[]> => {
  if (!newTags.length) return [];
  return await Promise.all(newTags.map(async (tag) => {
    const tagData = {
      name: tag,
    };
    return await fetch(`${API_HOST}/api/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: tagData}),
    }).then((r) => r.json())
      .then(({data}) => data.id);
  }));
};

const removeTagIfUnused = async (tagId: string): Promise<any> => {
  // TODO error handling
  const recipesWithTag = await fetch(`${API_HOST}/api/tags/${tagId}?populate=recipes`)
    .then((r) => r.json())
    .then(({data}) => { 
      return data.attributes.recipes?.data;
    });

  if (!recipesWithTag.length) {
    return await fetch(`${API_HOST}/api/tags/${tagId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json()).then(({data}) => console.log(data));
  }
};

export const getTags = async (): Promise<Tag[]> => {
  return await fetch(`${API_HOST}/api/tags`)
    .then((r) => r.json())
    .then(({data}) => {
      return data.map(({attributes, id}: {attributes: {name: string}, id: string}) => ({name: attributes.name, id}));
    });
};
