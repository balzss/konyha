import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Container,
  Grid,
  Box
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import TopBar from '../components/TopBar';
import RecipeCard from '../components/RecipeCard';
import { useAppDispatch, useAppSelector } from '../hooks'
import { Recipe } from '../utils/types'
import { selectAllRecipes, fetchRecipes } from '../store/recipeSlice';
import { fetchTags } from '../store/tagSlice';

export default function MainPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recipes: Recipe[] = useAppSelector(selectAllRecipes);
  const recipeStatus = useAppSelector((state) => state.recipes.status);
  const tagStatus = useAppSelector((state) => state.tags.status);
  const error = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes());
    }
    if (tagStatus === 'idle') {
      dispatch(fetchTags());
    }
  }, [recipeStatus, tagStatus, dispatch])

  const handleClickAdd = (_event: React.SyntheticEvent) => {
    navigate('/add');
  };

  const handleClickRecipe = (recipeSlug: string) => {
    navigate(`/${recipeSlug}`);
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
        leadingAction={{action: () => {}, icon: <FilterListIcon/>, label: 'Menü'}}
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
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
              <RecipeCard recipe={recipe} onClick={handleClickRecipe}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
