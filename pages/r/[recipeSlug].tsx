import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
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
import TopBar from '../../components/TopBar';
import ConfirmModal from '../../components/ConfirmModal';
import { useSingleRecipe, useDeleteRecipe } from '../../dataHooks';
import { propsWithAuth } from '../utils/propsWithAuth';

function RecipeIngredients({ingredients}: {ingredients: string[]}) {
  return (
    <div>
      <FormControl sx={{mt: 1, mb: 2}}>
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
      <FormControl sx={{mt: 1, mb: 3}}>
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

export default function RecipeDetailsPage() {
  const router = useRouter();
  const recipeSlug = router.query.recipeSlug as string;
  const { data: recipesData, error: recipeError } = useSingleRecipe(recipeSlug);
  const recipe = recipesData?.recipes[0];
  const [ deleteRecipe, { error: deleteError } ] = useDeleteRecipe();
  const tags = recipe?.tags;

  const [errorConfirmOpen, setErrorConfirmOpen] = useState<boolean>(false);

  const handleClickBack = () => {
    router.push('/');
  };

  const handleClickEdit = () => {
    if (!recipeSlug) return;
    router.push(`/r/${recipeSlug}/edit`);
  };

  const handleDeleteRecipe = async (_e: React.SyntheticEvent) => {
    await deleteRecipe({variables: {recipeSlug}});
    setErrorConfirmOpen(false);
    if (!deleteError) {
      router.push('/');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        paddingTop: '64px',
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
          <Typography variant="body1" component="div" sx={{my: 1}}>
            { recipe.description }
          </Typography>
        )}
        { recipe?.ingredients && <RecipeIngredients ingredients={recipe.ingredients}/> }
        { recipe?.instructions && <RecipeInstructions instructions={recipe.instructions}/> }
        <Stack direction="row" spacing={1}>
          {tags && tags.length > 0 && tags.map((tag) => (
            <Chip key={tag.id} label={`${tag.name}`} size="small" onClick={() => console.log(`Tag ID: ${tag.id}`)} />
          ))}
        </Stack>
        {recipeError && (
          <Alert severity="error">{recipeError.message}</Alert>
        )}
        {deleteError && (
          <Alert severity="error">{deleteError.message}</Alert>
        )}
      </Container>
    </Box>
  );
}

export const getServerSideProps = propsWithAuth;
