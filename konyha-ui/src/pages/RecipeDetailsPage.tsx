import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
} from '@mui/material';
import { fetchRecipes, selectRecipeById } from '../store/recipeSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Recipe } from '../utils/types';

function RecipeIngredients({ingredients}: {ingredients: string[]}) {
  return (
    <div>
      <FormControl sx={{my: 2}}>
        <FormLabel id="demo-radio-buttons-group-label"><b>Hozzávalók</b></FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          { ingredients.map((ingredient, index) => (
            <FormControlLabel key={index} value={index} control={<Checkbox size="small" />} label={ingredient} />
          )) }
        </RadioGroup>
      </FormControl>
    </div>
  );
}

function RecipeInstructions({instructions}: {instructions: string[]}) {
  return (
    <div>
      <FormControl sx={{my: 2}}>
        <FormLabel id="demo-radio-buttons-group-label"><b>Elkészítés</b></FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          { instructions.map((instruction, index) => (
            <FormControlLabel key={index} value={index} control={<Radio size="small" />} label={instruction} sx={{py: 0.5}}/>
          )) }
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default function RecipeDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useAppDispatch();
  const recipe: Recipe = useAppSelector((state) => selectRecipeById(state, params.recipeId));
  const recipeStatus = useAppSelector((state) => state.recipes.status);
  // const error = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [recipeStatus, dispatch])


  const handleClickBack = () => {
    navigate('/');
  };

  const handleClickEdit = () => {
    navigate(`/${recipe.id}/edit`);
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
      <Container maxWidth="sm">
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
            <Typography variant="h5" component="div">{recipe?.name}</Typography>
            <Button onClick={handleClickEdit} variant="outlined">
              Szerkesztés
            </Button>
          </div>
          { recipe?.description && (
            <Typography variant="body1" component="div">
              { recipe.description }
            </Typography>
          )}
          { recipe?.ingredients && <RecipeIngredients ingredients={recipe.ingredients}/>}
          { recipe?.instructions && <RecipeInstructions instructions={recipe.instructions}/>}
          {recipe.tags.map((tag) => (
            <Chip key={tag.id} label={tag.name} size="small" onClick={() => console.log(`Tag ID: ${tag.id}`)} />
          ))}
          <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem 0'}}>
            <Button onClick={handleClickBack}>
              Vissza
            </Button>
          </div>
      </Container>
    </Box>
  );
};
