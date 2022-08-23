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

- **Manage your recipe collection** from any device, filter by tags, use text search, export your data
- **Open source** and easy to self host without trackers or ads
- **Responsive UI** with dark and light themes
- **Multiple users** can use the same instance, login with Google or Github accounts
- **One click publish** to share selected recipes in a generated static site

### Planned features

- Email login
- Import from json
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
to the output of the site generator in Konyha. [More info](http://localhost:5000/docs/usage/static-site-generator) in
the docs.

## Getting started

Use the [official Docker images](https://hub.docker.com/u/konyha). This is the recommended way of
running Konyha. Other install methods are described [in the docs](https://konyha/xyz/docs/category/setup).

### Prerequisites:

- Docker and Docker Compose

### Running Konyha

1. Clone the [konyha-hosting](https://github.com/balzss/konyha-hosting) repository to your local machine or server

```
git clone https://github.com/balzss/konyha-hosting && cd konyha-hosting
```

2. Copy the `.env.example` file to `.env` and add your variables

3. Start containers with docker compose

```
docker compose up
```

### Reverse proxy

Use the `reverse-proxy` profile to run with traefik:

```
docker compose --profile reverse-proxy up
```

## Usage

Read about how to use Konyha [here](https://konyha/xyz/docs/category/usage).

## Development

Read about development [here](https://konyha/xyz/docs/category/development).

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

## License

The project is [licensed under GPLv3](/LICENSE).
