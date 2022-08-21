---
sidebar_position: 2
---

# Running with Docker

Running the app in containers

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
