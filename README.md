# Konyha Recipe Manager

Self hostable recipe manager and site generator written in typescript.

### Features:

- Works on every screensize
- Modern UI
- Dark and light theme
- Tagging and filtering
- Authentication with Github or Google
- Publish selected recipes to a static site

Planned features:

- Authentication with email
- Groceries list
- Portion calculator
- Export to/Import from json and csv

### Prerequisites:

- Docker and Docker Compose
- Node

### Running locally:

1. Clone the project:

```
git clone https://github.com/balzss/konyha-club.git && cd konyha-club
```

2. Install dependencies:

```
yarn install
```

3. Create an `.env` and `.env.local` file in the project root by copying `.env.example` and adding your variables.

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

9. Optionally you can inspect the db with running [prisma studio](https://www.prisma.io/studio):

```
yarn prisma:studio
```
