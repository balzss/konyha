import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip, CardActionArea, CardActions } from '@mui/material';
import { Recipe } from '../graphql/generated';

type RecipeCardProps = {
  recipe: Recipe;
  onClick: (recipeId: string) => void;
};

export default function RecipeCard({
  recipe,
  onClick,
}: RecipeCardProps) {
  const router = useRouter();
  const { tags } = recipe;

  const handleClickTag = (tagSlug: string) => {
    router.push(`/?tags=${tagSlug}`);
  }
  return (
    <Card variant="outlined" sx={{bgcolor: 'background.default', height: '100%'}}>
      <CardActionArea onClick={() => onClick(recipe.slug)}>
        <CardContent>
          <Typography variant="h5" component="div">
            {recipe.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      { tags && tags.length > 0 && (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px 16px', marginTop: 'auto'}}>
          {tags.map((tag) => (
            <Chip key={tag.id} label={`${tag.name}`} size="small" onClick={() => handleClickTag(tag.slug as string)}/>
          ))}
        </div>
      )}
    </Card>
  );
}
