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
  Stack,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { fetchRecipes, selectRecipeBySlug, addRecipe, editRecipe, removeRecipe } from '../store/recipeSlice';
import { fetchTags, selectAllTags } from '../store/tagSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
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

  const [recipeName, setRecipeName] = useState<string>('add test');
  const [description, setDescription] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('1111');
  const [instructions, setInstructions] = useState<string>('2222');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('newtag1');
  const [missingFields, setMissingFields] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const recipe: Recipe = useAppSelector((state) => selectRecipeBySlug(state, params.recipeSlug ?? ''));
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
  }, [recipeStatus, tagStatus, dispatch])

  useEffect(() => {
    if (recipe && tags.length) {
      setRecipeName(recipe.name);
      setIngredients(recipe.ingredients.join('\n'));
      setInstructions(recipe.instructions.join('\n'));
      setSelectedTags(recipe.tags.map((tagId) => tags.find(tag => tag.id === tagId)?.name) as string[]);
      if (recipe.description) {
        setDescription(recipe.description);
      }
    }
  }, [recipe, tags]);

  useEffect(() => {
    setMissingFields(!!getMissingFields({recipeName, ingredients, instructions}).length);
  }, [recipeName, ingredients, instructions]);

  const getTagByName = (tagName: string) => {
    return tags.find((tag) => tag.name === tagName)?.name;
  };

  const handleSubmitRecipe = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newRecipeData = {
      recipeName,
      description,
      ingredients,
      instructions,
      tags: selectedTags.map(getTagByName) as string[],
      newTag,
    };

    try {
      if (params.recipeSlug) {
        await dispatch(editRecipe({updatedRecipe: newRecipeData, recipeId: recipe.id})).unwrap();
      } else {
        await dispatch(addRecipe(newRecipeData)).unwrap();
      }
      // re-fetching the tags in case there were new ones created
      await dispatch(fetchTags()).unwrap();
    } catch (e) {
      // TODO handle error response
      console.error(e);
    } finally {
      navigate('/');
    }
  };

  const handleTagChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    setSelectedTags(event.target.value as string[]);
  };

  const handleClickBack = (_e: React.SyntheticEvent) => {
    navigate('/');
  };

  const handleDeleteRecipe = async (_e: React.SyntheticEvent) => {
    if (!params.recipeId) return;
    // TODO ask for confirmation
    try {
        await dispatch(removeRecipe(params.recipeId)).unwrap();
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
        bgcolor: 'background.paper',
        color: 'text.primary',
        minHeight: '100%',
        pt: 3,
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={handleSubmitRecipe}>
            <Typography variant="h5" component="div"> 
              {params.recipeId ? 'Recept szerkesztése' : 'Új recept'}
            </Typography>
          <Stack direction="row-reverse" spacing={1}>
            <Button onClick={handleSubmitRecipe} variant="outlined" type="submit" disabled={missingFields}>
              Mentés
            </Button>
            <Button onClick={handleDeleteRecipe} color="error">
              Törlés
            </Button>
          </Stack>
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
              value={selectedTags.map((selectedTag) => getTagByName(selectedTag) as string)}
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
