import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
  OutlinedInput,
  ListItemText,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Box,
  TextField,
  Container,
  Select,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { fetchRecipes, selectRecipeById } from '../store/recipeSlice';
import { fetchTags, selectAllTags } from '../store/tagSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import { saveNewRecipe } from '../utils/api';
import { Recipe, Tag } from '../utils/types';

type RequiredFields = {
  recipeName: string;
  ingredients: string;
  instructions: string;
};

function getMissingFields({recipeName, ingredients, instructions}: RequiredFields) {
  return [
    ...recipeName.trim() ? [] : ['recipeName'],
    ...ingredients.trim() ? [] : ['ingredients'],
    ...instructions.trim() ? [] : ['instructions'],
  ];
}

export default function EditRecipePage() {
  const params = useParams();
  const navigate = useNavigate();

  const [recipeName, setRecipeName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [missingFields, setMissingFields] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const recipe: Recipe = useAppSelector((state) => selectRecipeById(state, params.recipeId));
  const recipeStatus = useAppSelector((state) => state.recipes.status);
  const tags: Tag[] = useAppSelector(selectAllTags);
  const tagStatus = useAppSelector((state) => state.tags.status);
  // const error = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes())
    }
    if (tagStatus === 'idle') {
      dispatch(fetchTags())
    }
    if (recipe) {
      setRecipeName(recipe.name);
      setIngredients(recipe.ingredients.join('\n'));
      setInstructions(recipe.instructions.join('\n'));
      setSelectedTags(recipe.tags.map((tag) => tag.name));
      if (recipe.description) {
        setDescription(recipe.description);
      }
    }
  }, [recipeStatus, tagStatus, dispatch, recipe])

  useEffect(() => {
    setMissingFields(!!getMissingFields({recipeName, ingredients, instructions}).length);
  }, [recipeName, ingredients, instructions]);

  const handleSubmitRecipe = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (params.recipeId) {
      console.error('Editing recipes is not yet supported!');
      return;
    }

    const selectedTagIds = selectedTags
      .map((selectedTag) => tags.find((tag) => tag.name === selectedTag)?.id || '')
      .filter((tag) => tag);
    await saveNewRecipe({recipeName, description, ingredients, instructions, tags: selectedTagIds, newTag});
    // TODO handle error response
    navigate('/');
  };

  const handleTagChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClickBack = (_event: React.SyntheticEvent) => {
    navigate('/');
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
        <form onSubmit={handleSubmitRecipe}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h5" component="div"> 
              {params.recipeId ? 'Recept szerkesztése' : 'Új recept'}
            </Typography>
            <Button onClick={handleSubmitRecipe} variant="outlined" type="submit" disabled={missingFields}>
              Mentés
            </Button>
          </div>
          <TextField 
            label="Recept neve"
            variant="outlined"
            margin="normal"
            autoFocus={!params.recipeId}
            required
            sx={{width: '100%'}}
            value={recipeName}
            onChange={({target}) => setRecipeName(target.value)}
          />
          <TextField
            label="Leírás"
            variant="outlined"
            margin="normal"
            multiline
            minRows={2}
            sx={{width: '100%'}}
            value={description}
            onChange={({target}) => setDescription(target.value)}
          />
          <TextField
            label="Hozzávalók"
            variant="outlined"
            margin="normal"
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
            margin="normal"
            required
            multiline
            minRows={4}
            sx={{width: '100%'}}
            value={instructions}
            onChange={({target}) => setInstructions(target.value)}
          />
          <FormControl margin="normal" sx={{ width: "100%" }}>
            <InputLabel id="tag-select-label">Mentett címkék</InputLabel>
            <Select
              labelId="tag-select-label"
              multiple
              value={selectedTags}
              onChange={handleTagChange}
              input={<OutlinedInput label="Mentett címkék" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {tags.map(({name}) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedTags.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField 
            label="Új címke"
            variant="outlined"
            margin="normal"
            sx={{width: '100%'}}
            value={newTag}
            onChange={({target}) => setNewTag(target.value)}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem 0'}}>
            <Button onClick={handleClickBack}>
              Vissza
            </Button>
          </div>
        </form>
      </Container>
    </Box>
  );
}
