# Konyha Recipe Manager

Self hostable recipe manager written in typescript.

### Features:

- Optimised for smaller screens
- Material Design 3
- Dark and light theme
- Tagging, and filtering by tags
- Authentication with email, Github or Google

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
