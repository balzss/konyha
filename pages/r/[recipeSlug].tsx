import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  Box,
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
import { ArrowBack as ArrowBackIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TopBar, Head, ConfirmModal } from '../../components';
import { useSingleRecipe, useDeleteRecipe, useGetMe, usePublishRecipe } from '../../dataHooks';
import { propsWithAuth } from '../../utils/propsWithAuth';

function RecipeIngredients({ ingredients }: { ingredients: string[] }) {
  return (
    <div>
      <FormControl sx={{ mt: 1, mb: 2 }}>
        <FormLabel id="demo-radio-buttons-group-label">
          <b>Ingredients</b>
        </FormLabel>
        <RadioGroup>
          {ingredients.map((ingredient, index) => (
            <FormControlLabel key={index} value={index} control={<Checkbox size="small" />} label={ingredient} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

function RecipeInstructions({ instructions }: { instructions: string[] }) {
  return (
    <div>
      <FormControl sx={{ mt: 1, mb: 3 }}>
        <FormLabel id="demo-radio-buttons-group-label">
          <b>Instructions</b>
        </FormLabel>
        <RadioGroup>
          {instructions.map((instruction, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio size="small" />}
              label={instruction}
              sx={{ py: 0.5 }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default function RecipeDetailsPage() {
  const router = useRouter();
  const recipeSlug = router.query.recipeSlug as string;
  const { data: recipesData, error: recipeError } = useSingleRecipe(recipeSlug);
  const { data: meData, error: getMeError } = useGetMe();
  const recipe = recipesData?.recipes[0];
  const tags = recipe?.tags;
  const recipePublished = recipe?.published as boolean;
  const [deleteRecipe, { error: deleteError }] = useDeleteRecipe();
  const [publishRecipe, { error: publishError }] = usePublishRecipe();

  const [errorConfirmOpen, setErrorConfirmOpen] = useState<boolean>(false);
  const [publishConfirmOpen, setPublishConfirmOpen] = useState<boolean>(false);
  const [checkRecipePublished, setCheckRecipePublished] = useState<boolean>(recipePublished);

  useEffect(() => {
    setCheckRecipePublished(recipePublished);
  }, [recipePublished]);

  const handleClickBack = () => {
    router.push('/');
  };

  const handleClickEdit = () => {
    if (!recipeSlug) return;
    router.push(`/r/${recipeSlug}/edit`);
  };

  const handleDeleteRecipe = async (_e: React.SyntheticEvent) => {
    await deleteRecipe({ variables: { recipeSlug } });
    setErrorConfirmOpen(false);
    if (!deleteError) {
      router.push('/');
    }
  };

  const handleClickTag = (tagSlug: string) => {
    router.push(`/?tags=${tagSlug}`);
  };

  const handlePublishRecipe = async (_e: React.SyntheticEvent) => {
    await publishRecipe({ variables: { recipeSlug, publishState: !recipe?.published } });
    if (!publishError) {
      setCheckRecipePublished((prevState) => !prevState);
      setPublishConfirmOpen(false);
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
      <Head title={recipe?.name as string} />
      <TopBar
        leadingAction={{ action: handleClickBack, icon: <ArrowBackIcon />, label: 'Back' }}
        title={recipe?.name}
        trailingActions={[{ icon: <EditIcon />, action: handleClickEdit, label: 'Edit' }]}
        hiddenActions={[
          ...(meData?.me?.publishOptions?.published
            ? [
                {
                  icon: <Checkbox edge="start" checked={checkRecipePublished} tabIndex={-1} />,
                  action: () => setPublishConfirmOpen(true),
                  label: 'Published',
                },
              ]
            : []),
          { icon: <DeleteIcon fontSize="small" />, action: () => setErrorConfirmOpen(true), label: 'Delete recipe' },
        ]}
      />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
        {recipe?.description && (
          <Typography variant="body1" component="div" sx={{ my: 1 }}>
            {recipe.description}
          </Typography>
        )}
        {recipe?.ingredients && <RecipeIngredients ingredients={recipe.ingredients} />}
        {recipe?.instructions && <RecipeInstructions instructions={recipe.instructions} />}
        <Stack direction="row" spacing={1}>
          {tags &&
            tags.length > 0 &&
            tags.map((tag) => (
              <Chip
                key={tag.id}
                label={`${tag.name}`}
                size="small"
                onClick={() => handleClickTag(tag.slug as string)}
              />
            ))}
        </Stack>
        {recipeError && <Alert severity="error">{recipeError.message}</Alert>}
        {deleteError && <Alert severity="error">{deleteError.message}</Alert>}
      </div>
      <ConfirmModal
        open={errorConfirmOpen}
        title={'Delete recipe'}
        description={'Are you sure to delete this recipe?'}
        handleClose={() => setErrorConfirmOpen(false)}
        handleConfirm={handleDeleteRecipe}
        confirmText={'Delete'}
      />
      <ConfirmModal
        open={publishConfirmOpen}
        title={recipe?.published ? 'Unpublish recipe' : 'Publish recipe'}
        description={`Are you sure to ${recipe?.published ? 'unpublish' : 'publish'} this recipe?`}
        handleClose={() => setPublishConfirmOpen(false)}
        handleConfirm={handlePublishRecipe}
        confirmText={'Confirm'}
      />
    </Box>
  );
}

export const getServerSideProps = propsWithAuth;
