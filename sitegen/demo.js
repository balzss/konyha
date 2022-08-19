const fs = require('fs');
const Eleventy = require('@11ty/eleventy');

function getTags(recipes) {
  return [...new Set(recipes.reduce((acc, r) => [...r.Tags, ...acc], []))];
}

const { recipes, title } = JSON.parse(fs.readFileSync('demo.json', 'utf8'));

const Recipes = recipes.map(r => ({
  Title: r.name,
  Slug: r.slug,
  Description: r.description,
  Ingredients: r.ingredients,
  Instructions: r.instructions,
  Tags: r.tags.map(t => t.name),
}));

const Tags = getTags(Recipes);

const elev = new Eleventy('src', 'public/demo', {
  config: async function (eleventyConfig) {
    eleventyConfig.addGlobalData('Data',
      {
        Site: {
          BaseUrl: '/demo',
          Title: title,
        },
        Recipes,
        Tags,
      }
    );
  }
});

elev.write();
