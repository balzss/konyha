module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c2d4b3ee2e7a92fe1957d91af8be1b43'),
  },
});
