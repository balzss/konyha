<h1 align="center">
  <br>
  <a href="https://konyha.xyz"><img src="/public/logo128.png" height="128px" width="128px"></a>
  <br>
  Konyha Recipe Manager
  <br>
</h1>

<h4 align="center">Self hostable recipe manager and site generator written in TypeScript</h4>
<div align="center"><i>🚧 Project is in alpha stage and under heavy development! 🚧 </i></div>

<br>
<p align="center">
  <a href="https://konyha.xyz" target="_blank" rel="noopener noreferrer">Website</a> •
  <a href="https://konyha.xyz/docs" target="_blank" rel="noopener noreferrer">Docs</a>
</p>

## Features:

- **Browse and store recipes** from any device, filter by tags or search by text
- **Open source** and easy to self host without trackers or ads
- **Responsive UI** with dark and light themes
- **Multiple users** can use the same instance, login with Google or Github accounts
- **One click publish** to share selected recipes in a generated static site

### Planned features

- Email login
- Import from and export to json
- Offline mode
- More themes
- i18n
- Groceries list
- Connect to git repo
- Browser extension for importing recipes

## Screenshots

<p float="left">
  <img src="/sitegen/homepage/static/img/screenshot-manager-home.png" width="260" />
  <img src="/sitegen/homepage/static/img/screenshot-manager-details.png" width="260" />
  <img src="/sitegen/homepage/static/img/screenshot-manager-edit.png" width="260" />
</p>

## Static site generator

There is a [demo site](https://konyha.xyz/demo) generated from [this json](/sitegen/demo.json) file and is identical 
to the output of the site generator in Konyha.

## Getting started

### Prerequisites:

- Docker and Docker Compose
- Node

### Running locally:

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

9. Optionally you can inspect the db with [prisma studio](https://www.prisma.io/studio):

```
yarn prisma:studio
```

### Running with Docker

1. Clone the project:

```
git clone https://github.com/balzss/konyha.git && cd konyha
```

2. Create an `.env` file in the project root by copying `.env.example` and adding your variables.

3. Run the db

```
yarn docker:db
```

4. Build and run the manager app:

```
yarn docker:manager:build
```

5. Build and run the site generator:

```
yarn docker:sitegen:build
```

6. You can now access the manager at `localhost:3000` and the generated sites at `localhost:7777/<username>`


## Development

Read about development in the [docs](https://konyha/xyz/docs/category/development).

## Tools and assets used

- [Logo](https://www.flaticon.com/premium-icon/recipe-book_5402878)
- Fonts: [Roboto](https://fonts.google.com/specimen/Roboto), [Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab)
- [Docker Hub](https://hub.docker.com/)
- For the manager:
  - [Next.js](https://nextjs.org/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Material UI](https://mui.com/)
  - [Prisma](https://www.prisma.io/)
  - [Apollo](https://www.apollographql.com/docs/)
  - [node-fetch](https://github.com/node-fetch/node-fetch)
  - [use-debounce](https://github.com/xnimorz/use-debounce)
  - [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- For the site generator:
  - [11ty](https://www.11ty.dev/)
  - [Fastify](https://www.fastify.io/)
  - [markdown-it](https://github.com/markdown-it/markdown-it)
- For the docs:
  - [Docusaurus](https://docusaurus.io/)
  - [Tabler Icons](https://tabler-icons.io/)

## Licence

The project is [licensed under GPLv3](/LICENSE).
