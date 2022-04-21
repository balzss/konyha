import { gql } from "@apollo/client";
import client from "./apollo-client";

async function getRecipes() {
  const { data } = await client.query({
    query: gql`
      query {
        recipes {
          id
          title
        }
      }
    `,
  });
  return data;
}

export {
  getRecipes,
}
