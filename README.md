# Konyha Recipe Manager

Self hostable recipe manager written in typescript.

### Features:

- Works on every screensize
- Material Design 3
- Dark and light theme
- Tagging, and filtering
- Authentication with email, Github or Google

Features to come:

- Groceries list
- Portion calculator
- Export to json, csv or html
- Create and host static site with selected or all recipes

### Prerequisites:

- Docker and Docker Compose
- Node

### Setting it up locally:

1. Clone the project:

```
git clone https://github.com/balzss/konyha-club.git && cd konyha-club
```

2. Install dependencies:

```
yarn install
```

3. Create an `.env` file in the project root by copying `.env.example` and adding your variables.

4. Start the database:

```
yarn docker:db
```

5. Push the prisma schema to the running db:

```
yarn prisma:push
```

### Development:
