import { RawRecipe, RecipeRequest, Recipe, TagRequest } from './types';

const API_HOST = 'http://192.168.1.76:1337';

const createNewTags = async (newTags: string[] | undefined) => {
  if (!newTags || !newTags.length) return [];
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

export const saveNewRecipe = async ({recipeName, description, ingredients, instructions, tags = [], newTag}: RawRecipe) => {
  const formattedNewTags = newTag?.split(',').map((tag) => tag.trim());
  const newTagIds = await createNewTags(formattedNewTags);
  const data = {
    name: recipeName.trim(),
    description: description ? description.trim() : '',
    ingredients: ingredients.split('\n').map((ingredient) => ingredient.trim()),
    instructions: instructions.split('\n').map((instruction) => instruction.trim()),
    tags: [...tags, ...newTagIds],
  };

  fetch(`${API_HOST}/api/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({data}),
  });
};

export const getTags = async () => {
  return await fetch(`${API_HOST}/api/tags`)
    .then((r) => r.json())
    .then(({data}) => {
      return data.map(({attributes, id}: {attributes: {name: string}, id: string}) => ({name: attributes.name, id}));
    });
};

export const getRecipes = async () => {
  return await fetch(`${API_HOST}/api/recipes?populate=tags`)
    .then((r) => r.json())
    .then(({data}) => {
      const formattedData = data.map(({attributes, id}: RecipeRequest) => {
        const tags = attributes.tags.data.map((tag: TagRequest) => ({name: tag.attributes.name, id: `${tag.id}`}));
        return {
          ...attributes,
          id: `${id}`,
          tags,
        };
      });
      return formattedData;
    });
};
