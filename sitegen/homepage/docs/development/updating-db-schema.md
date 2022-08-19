---
sidebar_position: 1
---

# DB Schema

## Modifying the database schema

The database schema is located at `prisma/schema.prisma`. You can read about how it works 
and how to configure it [here](https://www.prisma.io/docs/concepts/components/prisma-schema).

After updating the schema you have to run `yarn prisma:push` to push your changes to the running db and generating the
prisma client. More about it [here](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push).
