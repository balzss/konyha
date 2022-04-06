import { RawRecipe } from './types';

const API_HOST = 'http://192.168.1.76:1337';

export const saveNewRecipe = async ({recipeName, description, ingredients, instructions, tags, newTag}: RawRecipe) => {
  const data = {
    name: recipeName.trim(),
    description: description ? description.trim() : '',
    ingredients: ingredients.split('\n').map((ingredient) => ingredient.trim()),
    instructions: instructions.split('\n').map((instruction) => instruction.trim()),
    tags,
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
      return data.map(({attributes, id}: {attributes: {name: string}, id: string}) => ({tagName: attributes.name, id}));
    });
};
