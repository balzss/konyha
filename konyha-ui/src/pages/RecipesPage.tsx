import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Container,
  Grid,
  Box
} from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { useAppDispatch, useAppSelector } from '../hooks'
import { Recipe } from '../utils/types'
import { selectAllRecipes, fetchRecipes } from '../store/recipeSlice';

export default function RecipesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recipes: Recipe[] = useAppSelector(selectAllRecipes);
  const recipeStatus = useAppSelector((state) => state.recipes.status);
  const error = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [recipeStatus, dispatch])

  const handleClickAdd = (_event: React.SyntheticEvent) => {
    navigate('/add');
  };

  const handleClickRecipe = (recipeId: string) => {
    navigate(`/${recipeId}`);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        minHeight: '100%',
        pt: 3,
      }}
    >
      <Container maxWidth="md">
        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}> 
          <Button onClick={handleClickAdd}>
            Új recept
          </Button>
        </div>
        <Grid container spacing={2}>
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
