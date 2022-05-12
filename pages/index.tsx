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
  Add as AddIcon,
  Search as SearchIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';
import {
  BottomNav,
  Layout,
  TopBar,
  RecipeCard,
} from '../components';

export default function MainPage() {
  const router = useRouter();
  const { data: recipesData, error, loading } = useRecipes();
  const recipes = recipesData?.recipes;

  const handleClickAdd = (_event: React.SyntheticEvent) => {
    router.push('/add');
  };

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
      <TopBar
        leadingAction={{action: () => {}, icon: <TuneIcon/>, label: 'Menü'}}
        title="Összes recept"
        trailingActions={[
          {icon: <SearchIcon/>, action: () => {}, label: 'Keresés'},
          {icon: <AddIcon/>, action: handleClickAdd, label: 'Új recept'},
        ]}
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