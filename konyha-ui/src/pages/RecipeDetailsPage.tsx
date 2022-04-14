import { useEffect, useState } from 'react';
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
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import TopBar from '../components/TopBar';
import ConfirmModal from '../components/ConfirmModal';
import { fetchRecipes, selectRecipeBySlug, removeRecipe } from '../store/recipeSlice';
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
  const [errorConfirmOpen, setErrorConfirmOpen] = useState<boolean>(false);

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

  const handleDeleteRecipe = async (_e: React.SyntheticEvent) => {
    if (!recipe.id) return;
    // TODO ask for confirmation
    try {
        await dispatch(removeRecipe(recipe.id)).unwrap();
    } catch (e) {
      // TODO handle error response
      console.error(e);
    } finally {
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        paddingTop: '80px',
      }}
    >
      <TopBar
        leadingAction={{action: handleClickBack, icon: <ArrowBackIcon/>, label: 'Vissza'}}
        title={recipe?.name}
        trailingActions={[
          {icon: <EditIcon/>, action: handleClickEdit, label: 'Szerkesztés'},
        ]}
        hiddenActions={[
          {icon: <DeleteIcon fontSize="small"/>, action: () => setErrorConfirmOpen(true), label: 'Recept törlése'},
        ]}
      />
      <ConfirmModal
        open={errorConfirmOpen}
        title={'Törlés'}
        desription={'Biztosan törlöd a receptet?'}
        handleClose={() => setErrorConfirmOpen(false)}
        handleConfirm={handleDeleteRecipe}
        confirmText={'Törlés'}
      />
      <Container maxWidth="md">
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
