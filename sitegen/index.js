const path = require('path');
const fs = require('fs').promises;
const Eleventy = require('@11ty/eleventy');
const fastify = require('fastify')({
  logger: true,
});
const { PrismaClient } = require('./prisma/client');
const prisma = new PrismaClient()

const USER_ID_BLACKLIST = [
  'demo',
  '404',
  'assets',
  'blog',
  'updates',
  'docs',
  'img',
  'index',
  'sitemap',
  'r',
  'admin',
];

function getTags(recipes) {
  return [...new Set(recipes.reduce((acc, r) => [...r.Tags, ...acc], []))];
}

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});

fastify.setNotFoundHandler(function (_req, reply) {
  reply.code(404).send({ error: 'Not Found', message: 'Recipe page not found', statusCode: 404 })
})

fastify.get('/', function (_req, reply) {
  return reply.sendFile('index.html');
});

fastify.get('/dashboard', async function (req, reply) {
  try {
    const sites = await prisma.site.findMany()
    return reply.send({sites});
  } catch (error) {
    return reply.send({message: 'error', error});
  }
});

fastify.get('/:userId/health', function (req, reply) {
  const { userId } = req.params;
  fs.stat(`public/${userId}/index.html`).then(() => {
    return reply.send({status: 'up'});
  }).catch((_error) => {
    return reply.send({message: 'error', error: 'Site not found'});
  });
});

fastify.post('/publish', async function (req, reply) {
  const { publishId, ownerId, recipes } = req.body;

  const previousSiteOptions = {
    where: {
      ownerId: ownerId ?? '',
    },
  };
  let previousSite;
  try {
    previousSite = await prisma.site.findUnique(previousSiteOptions);
  } catch (error) {
    // TODO check if new users get this error
    return reply.send({message: 'error', error, published: false});
  }

  const options = {
    where: {
      ownerId: ownerId ?? '',
    },
    update: {
      data: JSON.stringify(recipes),
      publishId,
      ownerId,
    },
    create: {
      data: JSON.stringify(recipes),
      publishId,
      ownerId,
    },
  };
  try {
    const upsertSite = await prisma.site.upsert(options);
  } catch (error) {
    return reply.send({
      message: 'error',
      error: error.code === 'P2002' ? 'publishId already in use' : error.message,
      published: !!previousSite,
    });
  }

  if (previousSite?.publishId && previousSite.publishId !== publishId) {
    try {
      await fs.rename(`public/r/${previousSite.publishId}`, `public/r/${publishId}`);
    } catch (error) {
      console.log(error);
    }
  }

  const Recipes = recipes.map(r => ({
      Title: r.name,
      Slug: r.slug,
      Description: r.description,
      Ingredients: r.ingredients,
      Instructions: r.instructions,
      Tags: r.tags.map(t => t.name),
    }));

  const Tags = getTags(Recipes);

  const elev = new Eleventy('src', `public/r/${publishId}`, {
    config: async function (eleventyConfig) {
      eleventyConfig.addGlobalData('Data',
        {
          Site: {
            BaseUrl: `/r/${publishId}`,
            Title: publishId,
          },
          Recipes,
          Tags,
        }
      );
    }
  });
  try {
    await elev.write();
    return reply.send({message: 'success', published: true});
  } catch (error) {
    return reply.send({message: 'error', error, published: false});
  }
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
