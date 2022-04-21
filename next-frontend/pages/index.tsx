import useSWR from 'swr';
import { recipesFetcher } from '../graphql/fetchers';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { data, error } = useSWR('arg', recipesFetcher);
  console.log({data, error})

  return (
    <div>
      hello
    </div>
  )
}

export default Home
