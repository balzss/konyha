import type { NextPage } from 'next';
import {
  Alert,
  Container,
  Grid,
  Box
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterAlt as FilterAltIcon,
} from '@mui/icons-material';
import TopBar from '../components/TopBar';
import RecipeCard from '../components/RecipeCard';
import BottomNav from '../components/BottomNav';
import { useRecipes } from '../dataHooks';

const MainPage: NextPage = () => {
  const { recipes, error } = useRecipes();

  const handleClickAdd = (_event: React.SyntheticEvent) => {
    // navigate('/add');
  };

  const handleClickRecipe = (recipeSlug: string) => {
    // navigate(`/${recipeSlug}`);
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
        leadingAction={{action: () => {}, icon: <FilterAltIcon/>, label: 'Menü'}}
        title="Összes recept"
        trailingActions={[
          {icon: <SearchIcon/>, action: () => {}, label: 'Keresés'},
          {icon: <AddIcon/>, action: handleClickAdd, label: 'Új recept'},
        ]}
      />
      <Container maxWidth="md" sx={{px: 2}} disableGutters>
        <Grid container spacing={1}>
          {error && (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          {recipes && recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
              <RecipeCard recipe={recipe} onClick={handleClickRecipe}/>
            </Grid>
          ))}
        </Grid>
      </Container>
      <BottomNav/>
    </Box>
  );
}

export default MainPage;
