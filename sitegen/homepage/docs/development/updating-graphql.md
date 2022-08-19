---
sidebar_position: 2
---

# GraphQL

## Updating graphql types, queries or mutations 

All graphql code is located in `graphql/schema.graphql`. After updating it you have run `yarn gql:generate` to generate
corresponding types.

The code generation is done via [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started)
and the generation config is located at `graphql/codegen.yml`.

Resolvers are in `grapqhl/resolvers.ts` and are used to define how the graphql api serves and modifies data. After
modification you have to run `yarn gql:generate` again to generate the typescript files for apollo server and client.
