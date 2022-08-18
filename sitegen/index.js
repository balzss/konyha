const Eleventy = require('@11ty/eleventy');
const fastify = require('fastify')({
  logger: true,
});
const path = require('path');

const USER_ID_BLACKLIST = [
  '404',
  'assets',
  'blog',
  'updates',
  'docs',
  'img',
  'index',
  'sitemap',
];

function getTags(recipes) {
  return [...new Set(recipes.reduce((acc, r) => [...r.Tags, ...acc], []))];
}

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});

fastify.setNotFoundHandler(function (req, reply) {
  reply.code(404).send({ error: 'Not Found', message: 'Recipe page not found', statusCode: 404 })
})

fastify.get('/', function (req, reply) {
  return reply.sendFile('index.html');
});

fastify.post('/:userId', async function (req, reply) {
  const { userId } = req.params;
  const { recipes, title } = req.body;
  console.log(recipes)
  console.log(title)

  const Recipes = recipes.map(r => ({
      Title: r.name,
      Slug: r.slug,
      Description: r.description,
      Ingredients: r.ingredients,
      Instructions: r.instructions,
      Tags: r.tags.map(t => t.name),
    }));

  const Tags = getTags(Recipes);

  const elev = new Eleventy('src', `public/${userId}`, {
    config: async function (eleventyConfig) {
      eleventyConfig.addGlobalData('Data',
        {
          Site: {
            BaseUrl: `/${userId}`,
            Title: title,
          },
          Recipes,
          Tags,
        }
      );
    }
  });
  await elev.write();
  return reply.send({message: 'done'});
});

fastify.delete('/:userId', function (req, reply) {
  const { userId } = req.params;
  return reply.send({message: 'delete'});
});

fastify.listen({ port: 7777, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
