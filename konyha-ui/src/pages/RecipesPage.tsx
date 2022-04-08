import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks'
import { Recipe } from '../utils/types'
import { selectAllRecipes, fetchRecipes } from '../store/recipeSlice';
import {
  Button,
  Container,
  Grid,
  Box
} from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import RecipeDetails from '../pages/RecipeDetailsPage';

export default function RecipesPage() {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState<string | null>(null); // null for no recipe, $id for recipe to show

  const dispatch = useAppDispatch();
  const recipes: Recipe[] = useAppSelector(selectAllRecipes);
  const recipeStatus = useAppSelector((state) => state.recipes.status);
  // const error = useAppSelector((state) => state.recipes.error);

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
        pb: '50%',
      }}
    >
      <Container maxWidth="md">
        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}> 
          <Button onClick={handleClickAdd}>
            Új recept
          </Button>
        </div>
        <Grid container spacing={2}>
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
