import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import TopBar from '../components/TopBar';
import { fetchRecipes, selectRecipeBySlug } from '../store/recipeSlice';
import { fetchTags, selectTagsByIds } from '../store/tagSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Recipe, Tag } from '../utils/types';

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
  const recipe: Recipe = useAppSelector((state) => selectRecipeBySlug(state, params.recipeSlug ?? ''));
  const recipeStatus = useAppSelector((state) => state.recipes.status);
  const tags: Tag[] = useAppSelector((state) => selectTagsByIds(state, recipe?.tags || []));
  const tagStatus = useAppSelector((state) => state.tags.status);
  // const error = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes());
    }
    if (tagStatus === 'idle') {
      dispatch(fetchTags());
    }
  }, [recipeStatus, tagStatus, dispatch])


  const handleClickBack = () => {
    navigate('/');
  };

  const handleClickEdit = () => {
    if (!recipe.slug) return;
    navigate(`/${recipe.slug}/edit`);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        minHeight: '100%',
        paddingTop: '80px',
      }}
    >
      <TopBar
        leadingAction={{action: handleClickBack, icon: <CloseIcon/>, label: 'Vissza'}}
        title={recipe?.name}
        trailingActions={[
          {icon: <EditIcon/>, action: handleClickEdit, label: 'Szerkesztés'},
        ]}
        hiddenActions={[
          {icon: <EditIcon/>, action: () => {}, label: 'Recept törlése'},
        ]}
      />
      <Container maxWidth="sm">
        { recipe?.description && (
          <Typography variant="body1" component="div">
            { recipe.description }
          </Typography>
        )}
        { recipe?.ingredients && <RecipeIngredients ingredients={recipe.ingredients}/>}
        { recipe?.instructions && <RecipeInstructions instructions={recipe.instructions}/>}
        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
            <Chip key={tag.id} label={`${tag.name}`} size="small" onClick={() => console.log(`Tag ID: ${tag.id}`)} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
