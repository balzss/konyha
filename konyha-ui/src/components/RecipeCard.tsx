import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Typography from '@mui/material/Typography';
import { Chip, CardActionArea, CardActions } from '@mui/material';
import { useAppSelector } from '../hooks';
import { Recipe, Tag } from '../utils/types';
import { selectTagsByIds } from '../store/tagSlice';

type RecipeCardProps = {
  recipe: Recipe;
  onClick: (recipeId: string) => void;
};

export default function RecipeCard({
  recipe,
  onClick,
}: RecipeCardProps) {
  const tags: Tag[] = useAppSelector((state) => selectTagsByIds(state, recipe.tags));
  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => onClick(recipe.slug)}>
        {/*<CardMedia
          component="img"
          height="120"
          image={recipe.image}
          alt={recipe.name}
          />*/}
        <CardContent>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            {recipe.name}
            <ArrowForwardRoundedIcon />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {tags.map((tag) => (
          <Chip key={tag.id} label={`${tag.name}`} size="small" onClick={() => console.log(`Tag ID: ${tag.id}`)} />
        ))}
      </CardActions>
    </Card>
  );
}
