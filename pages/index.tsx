import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useRecipes } from '../dataHooks';
import {
  Alert,
  Container,
  Grid,
  Box
} from '@mui/material';
import {
  BottomNav,
  Layout,
  RecipeCard,
  HomeTopBar,
} from '../components';
import { propsWithAuth } from '../utils/propsWithAuth';

export default function MainPage() {
  const router = useRouter();
  const { data: recipesData, error, loading } = useRecipes();
  const recipes = recipesData?.recipes;

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
      <HomeTopBar
        selection={[]}
        onSelectionChange={() => {}}
      />
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
