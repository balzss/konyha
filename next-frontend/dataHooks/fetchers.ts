import { gql } from "@apollo/client";
import client from "./apollo-client";

async function recipesFetcher(arg: string) {
  console.log(arg);
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

export {
  recipesFetcher,
}
