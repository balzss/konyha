import { useEffect, useState } from 'react';
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
import { getTags, saveNewRecipe } from '../utils/api';

type RequiredFields = {
  recipeName: string;
  ingredients: string;
  instructions: string;
};

function getErrors({recipeName, ingredients, instructions}: RequiredFields) {
  const fieldErrors = [
    ...recipeName.trim() ? [] : ['recipeName'],
    ...ingredients.trim() ? [] : ['ingredients'],
    ...instructions.trim() ? [] : ['instructions'],
  ];
  return fieldErrors;
}

export default function AddRecipePage() {
  const [recipeName, setRecipeName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [tags, setTags] = useState<{tagName: string; id: string}[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTags() {
      const fetchedTags = await getTags();
      setTags(fetchedTags);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    setErrors([]);
  }, [recipeName, ingredients, instructions]);

  const handleSubmitRecipe = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const fieldErrors = getErrors({recipeName, ingredients, instructions});
    if (fieldErrors.length) {
      setErrors(fieldErrors);
      return;
    }

    const selectedTagIds = selectedTags
      .map((selectedTag) => tags.find((tag) => tag.tagName === selectedTag)?.id || '')
      .filter((tag) => tag);
    await saveNewRecipe({recipeName, description, ingredients, instructions, tags: selectedTagIds, newTag});
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
      <Container maxWidth="sm">
        <form onSubmit={handleSubmitRecipe}>
          <Typography variant="h5" component="div">Új recept hozzáadása</Typography>
          <TextField 
            label="Recept neve"
            variant="outlined"
            margin="normal"
            error={errors.includes('recipeName')}
            helperText={errors.includes('recipeName') ? 'A mező kitöltése kötelező' : ''}
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
            rows={2}
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
            rows={5}
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
            rows={5}
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
              {tags.map(({tagName}) => (
                <MenuItem key={tagName} value={tagName}>
                  <Checkbox checked={selectedTags.indexOf(tagName) > -1} />
                  <ListItemText primary={tagName} />
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
            <Button autoFocus onClick={handleSubmitRecipe} variant="outlined" type="submit">
              Mentés
            </Button>
          </div>
        </form>
      </Container>
    </Box>
  );
}
