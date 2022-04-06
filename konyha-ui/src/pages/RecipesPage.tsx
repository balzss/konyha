import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RecipeCard from '../components/RecipeCard';
import RecipeDetails from '../components/RecipeDetails';

type Tag = {
  id: string;
  name: string;
}

export type Recipe = {
  name: string;
  image: string;
  id: string;
  ingredients: string[];
  instructions: string[];
  tags: Tag[],
  description?: string;
};

type RecipeRequest = {
  attributes: Recipe | { tags: any };
  id: string;
}

type TagRequest = {
  attributes: Tag;
  id: string;
};

function formatRecipesRequest(requestData: any): Recipe[] {
  return requestData.map(({attributes, id}: RecipeRequest) => {
    const tags = attributes.tags.data.map((tag: TagRequest) => ({name: tag.attributes.name, id: tag.id}));
    return {
      ...attributes,
      id,
      tags,
    };
  });
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showDetails, setShowDetails] = useState<string | null>(null); // null for no recipe, $id for recipe to show

  useEffect(() => {
    fetch('http://192.168.1.76:1337/api/recipes?populate=tags')
      .then((r) => r.json())
      .then(({data}) => {
        const formattedRecipes = formatRecipesRequest(data);
        setRecipes(formattedRecipes);
      });
  }, []);

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
        <Grid container spacing={2}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <RecipeCard recipe={recipe} onClick={(recipeId) => {setShowDetails(recipeId)}}/>
            </Grid>
          ))}
        </Grid>
        <RecipeDetails open={!!showDetails} handleClose={() => setShowDetails(null)} recipe={recipes.find((recipe) => recipe.id === showDetails)}/>
      </Container>
    </Box>
  );
}
