import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  OutlinedInput,
  ListItemText,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  TextField,
  Container,
  Select,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  Close as CloseIcon,
  Save as SaveIcon,
} from '@mui/icons-material'
import TopBar from '../components/TopBar';
import ConfirmModal from '../components/ConfirmModal';
import { useSingleRecipe, useTags, useCreateRecipe, useUpdateRecipe } from '../dataHooks';

export default function EditRecipePage() {
  const router = useRouter();
  const recipeSlug = router.query.recipeSlug as string;
  const { data: sessionData } = useSession();
  // const { mutate: createRecipe } = useCreateRecipe();
  const [ updateRecipe, {error: recipeUpdateError} ] = useUpdateRecipe();
  const createRecipe = () => {}
  const { data: recipesData } = useSingleRecipe(recipeSlug);
  const recipe = recipesData?.recipes[0];
  const { data: tagsData } = useTags();
  const tags = tagsData?.tags;

  const [recipeName, setRecipeName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string>('');
  const [saveConfirmOpen, setSaveConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    if (recipe && tags) {
      setRecipeName(recipe.name);
      setIngredients(recipe.ingredients?.join('\n') ?? '');
      setInstructions(recipe.instructions?.join('\n') ?? '');
      setSelectedTags(recipe.tags?.map((tag) => tag?.id as string) ?? []);
      if (recipe.description) {
        setDescription(recipe.description);
      }
    }
  }, [recipe, tags]);

  const getTagNameById = (tagId: string): string | undefined => {
    return tags?.find((tag) => tag?.id === tagId)?.name;
  };

  const handleSubmitRecipe = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newRecipeData = {
      name: recipeName,
      description,
      ingredients: ingredients.split('\n'),
      instructions: instructions.split('\n'),
      // newTags,
    };

    if (recipe?.id) {
      const {data: {upsertRecipe: {slug}}} = await updateRecipe(recipe.id, newRecipeData, selectedTags);
      if (slug) {
        router.push(`/r/${slug}`);
      }
    } else {
      // createRecipe({recipeData: newRecipeData, sessionToken}, {
      //     if (data.slug) {
      //       router.push(`/r/${data.slug}`);
      //     }
    }
  };

  const handleTagChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    setSelectedTags(event.target.value as string[]);
  };

  const handleClickBack = (_e: React.SyntheticEvent) => {
    router.push('/');
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
        leadingAction={{action: handleClickBack, icon: <CloseIcon/>, label: 'Vissza'}}
        title={recipeSlug ? 'Recept szerkesztése' : 'Új recept'}
        trailingActions={[
          {icon: <SaveIcon/>, action: () => setSaveConfirmOpen(true), label: 'Mentés'},
        ]}
        hiddenActions={[]}
      />
      <ConfirmModal
        open={saveConfirmOpen}
        title={'Mentés'}
        desription={'Biztosan mented a receptet?'}
        handleClose={() => setSaveConfirmOpen(false)}
        handleConfirm={handleSubmitRecipe}
        confirmText={'Mentés'}
      />
      <Container maxWidth="sm">
        <form onSubmit={handleSubmitRecipe}>
          <TextField
            label="Recept neve"
            variant="outlined"
            margin="dense"
            required
            sx={{width: '100%'}}
            value={recipeName}
            onChange={({target}) => setRecipeName(target.value)}
          />
          <TextField
            label="Leírás"
            variant="outlined"
            margin="dense"
            multiline
            minRows={2}
            sx={{width: '100%'}}
            value={description}
            onChange={({target}) => setDescription(target.value)}
          />
          <TextField
            label="Hozzávalók"
            variant="outlined"
            margin="dense"
            required
            multiline
            minRows={4}
            sx={{width: '100%'}}
            value={ingredients}
            onChange={({target}) => setIngredients(target.value)}
          />
          <TextField
            label="Elkészítés"
            variant="outlined"
            margin="dense"
            required
            multiline
            minRows={4}
            sx={{width: '100%'}}
            value={instructions}
            onChange={({target}) => setInstructions(target.value)}
          />
          <FormControl margin="dense" sx={{ width: "100%" }}>
            <InputLabel id="tag-select-label">Mentett címkék</InputLabel>
            <Select
              labelId="tag-select-label"
              multiple
              value={selectedTags}
              onChange={handleTagChange}
              input={<OutlinedInput label="Mentett címkék" />}
              renderValue={(selected) => selected.map(getTagNameById).join(', ')}
            >
              {tags && tags.length > 0 && tags.map(({name, id}) => (
                <MenuItem key={id} value={id}>
                  <Checkbox checked={selectedTags.indexOf(id) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Új címkék"
            variant="outlined"
            margin="dense"
            sx={{width: '100%'}}
            value={newTags}
            onChange={({target}) => setNewTags(target.value)}
          />
        </form>
      </Container>
    </Box>
  );
};
