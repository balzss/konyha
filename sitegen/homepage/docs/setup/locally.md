---
sidebar_position: 2
---

# Install from source

Running without containers for development or testing.

### Prerequisites

- Docker and Docker Compose (for the postgres db)
- Node

## Setup

1. Clone the project:

```
git clone https://github.com/balzss/konyha.git && cd konyha
```

2. Install dependencies:

```
yarn install
```

3. Create an `.env.local` file in the project root by copying `.env.example` and adding your variables and configuring
   at least one next auth provider.

4. Start the database:

```
yarn docker:db
```

5. Push the prisma schema to the running db:

```
yarn prisma:push
```

6. Start the manager app:

```
yarn next:dev
```

7. Start the site generator:

```
yarn sitegen:dev
```

8. You can now access the manager at `localhost:3000` and the generated sites at `localhost:7777/<username>`

9. Optionally you can inspect the db with [Prisma Studio](https://www.prisma.io/studio):

```
yarn prisma:studio
```
