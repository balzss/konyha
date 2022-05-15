import { useRouter } from 'next/router';
import {
  Box,
  Alert,
  Container,
  Grid,
} from '@mui/material';
import {
  Head,
  SearchBar,
  RecipeCard,
} from '../components';
import { 
  useSearchRecipes,
} from '../dataHooks';

export default function SearchPage() {
  const router = useRouter();
  const [searchRecipes, {data: searchResults, error: searchRecipesError}] = useSearchRecipes();
  const handleQueryChange = (query: string) => {
    searchRecipes(query);
  };

  const handleClickRecipe = (recipeSlug: string) => {
    router.push(`/r/${recipeSlug}`);
  };

  return(
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        py: 8,
      }}
    >
      <Head title="Keresés"/>
      <SearchBar onDebouncedChange={handleQueryChange} delay={500}/>
      <Container maxWidth="md" sx={{px: 2}} disableGutters>
        <Grid container spacing={1}>
          <>
            {searchRecipesError && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Alert severity="error">{searchRecipesError.message}</Alert>
              </Grid>
            )}
            {searchResults && searchResults.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                <RecipeCard recipe={recipe} onClick={handleClickRecipe}/>
              </Grid>
            ))}
          </>
        </Grid>
      </Container>
    </Box>
  );
}
