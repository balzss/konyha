import { gql } from "@apollo/client";
import client from "./apollo-client";

async function recipesFetcher() {
  const { data } = await client.query({
    query: gql`
      query {
        recipes {
          id
          name
          tags {
            id
            name
          }
        }
      }
    `,
  });
  return data;
}

async function tagFetcher() {
  const { data } = await client.query({
    query: gql`
      query {
        tags {
          id
          name
        }
      }
    `,
  });
  return data;
}

async function singleRecipeFetcher(recipeSlug: string) {
  const { data } = await client.query({
    query: gql`
      query {
        recipes(where: {slug: {equals: ${recipeSlug}}}) {
          id
          name
          slug
          description
          tags {
            id
            name
          }
        }
      }
    `,
  });
  console.log(data)
  return data;
}

export {
  recipesFetcher,
  tagFetcher,
  singleRecipeFetcher,
}
