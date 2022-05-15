import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  Container,
  Grid,
  Box
} from '@mui/material';
import {
  Head,
  BottomNav,
  Layout,
  RecipeCard,
  HomeTopBar,
} from '../components';
import { useRecipes } from '../dataHooks';
import { propsWithAuth } from '../utils/propsWithAuth';
import getTagsFromUrl from '../utils/getTagsFromUrl';

export default function MainPage() {
  const router = useRouter();
  const selectedTags = getTagsFromUrl(router);
  const { data: recipesData, error, loading } = useRecipes();
  // TODO filter in request?
  const recipes = recipesData?.recipes.filter((recipe) => {
    if (!selectedTags.length) return true;
    const recipeSlugs = recipe?.tags?.map((tag) => tag.slug) || [];
    const intersection = selectedTags.filter(t => recipeSlugs.includes(t));
    return !!intersection?.length;
  });

  const handleClickRecipe = (recipeSlug: string) => {
    router.push(`/r/${recipeSlug}`);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        py: 8,
      }}
    >
      <Head title="Receptek"/>
      <HomeTopBar />
      <Container maxWidth="md" sx={{px: 2}} disableGutters>
        <Grid container spacing={1}>
          <>
            {error && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Alert severity="error">{error.message}</Alert>
              </Grid>
            )}
            {recipes && recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                <RecipeCard recipe={recipe} onClick={handleClickRecipe}/>
              </Grid>
            ))}
          </>
        </Grid>
      </Container>
      <BottomNav/>
    </Box>
  );
}

MainPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export const getServerSideProps = propsWithAuth;
