<h1 align="center">
  <br>
  <a href="https://konyha.xyz"><img src="/public/logo128.png" height="128px" width="128px"></a>
  <br>
  Konyha Recipe Manager
  <br>
</h1>

<h4 align="center">Self hostable recipe manager and site generator written in typescript.</h4>

<p align="center">
  <a href="https://konyha.xyz" target="_blank" rel="noopener noreferrer">Website</a> •
  <a href="https://konyha.xyz/docs" target="_blank" rel="noopener noreferrer">Docs</a>
</p>


### Features:

- **Browse and store recipes** from any device, filter by tags or search by text
- **Open source** and easy to self host without trackers or ads
- **Responsive UI** with dark and light themes
- **One click publish** to share selected recipes in a generated static site
- **Multiple users** can use the same instance, login with Google or Github accounts

Planned features:

- Authentication with email
- Groceries list
- Portion calculator
- Export to/Import from json and csv

### Prerequisites:

- Docker and Docker Compose
- Node

## Running locally:

1. Clone the project:

```
git clone https://github.com/balzss/konyha-club.git && cd konyha-club
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

## Development

### Updating the db schema

The database schema is located at `prisma/schema.prisma`. You can read about how it works 
and how to configure it [here](https://www.prisma.io/docs/concepts/components/prisma-schema).

After updating the schema you have to run `yarn prisma:push` to push your changes to the running db and generating the
prisma client. More about it [here](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push).

### Updating the graphql types, queries or mutations

All graphql code is located in `graphql/schema.graphql`. After updating it you have run `yarn gql:generate` to generate
corresponding types.

The code generation is done via [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started)
and the generation config is located at `graphql/codegen.yml`.

Resolvers are in `grapqhl/resolvers.ts` and are used to define how the graphql api serves and modifies data. After
modification you have to run `yarn gql:generate` again to generate the typescript files for apollo server and client.

### Reading and modifying data with data hooks

The graphql code generator creates data hooks that can be used directly however they are "proxied" in
`dataHooks/index.ts`. Any pre- or postprocessing of data is done here.

### Project structure: pages and components

The project follows the general structure of a next.js project so [pages](https://nextjs.org/docs/basic-features/pages)
are in the `pages/` folder and components are in `components/`.

### Theming

Theming is done via [MUI](https://mui.com/material-ui/customization/theming/) in `utils/theme.ts` and with css in
`styles/`.

## Running with Docker

1. Clone the project:

```
git clone https://github.com/balzss/konyha-club.git && cd konyha-club
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
