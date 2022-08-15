const fastify = require('fastify')({
  logger: true,
});
const path = require('path');

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '_site'),
});

fastify.setNotFoundHandler(function (req, reply) {
  reply.code(404).send({ error: 'Not Found', message: 'Recipe page not found', statusCode: 404 })
})

fastify.get('/', function (req, reply) {
  return reply.sendFile('bazsi420/index.html');
});

fastify.get('/:userId', function (req, reply) {
  const { userId } = req.params;
  return reply.sendFile(`${userId}/index.html`);
});

fastify.listen({ port: 7777 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
