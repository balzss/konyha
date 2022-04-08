import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecipes, selectRecipeById } from '../store/recipeSlice';
import { useAppSelector, useAppDispatch } from '../hooks';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Recipe } from '../utils/types';

import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RecipeIngredients({ingredients}: {ingredients: string[]}) {
  return (
    <div>
      <FormControl sx={{my: 2}}>
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
      <FormControl sx={{my: 2}}>
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

export default function RecipeDetails() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useAppDispatch();
  const recipe: Recipe = useAppSelector((state) => selectRecipeById(state, params.recipeId));
  const recipeStatus = useAppSelector((state) => state.recipes.status);
  // const error = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [recipeStatus, dispatch])


  const handleClose = () => {
    navigate('/');
  };

  return (
    <Dialog open={true} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle> 
        {recipe && recipe.name} 
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent  sx={{width: '500px', maxWidth: '100%'}}>
        <DialogContentText>
          { recipe?.description && (
            <>
              <Typography variant="body1" component="div" paragraph>
                { recipe.description }
              </Typography>
            </>
          )}
          { recipe?.ingredients && <RecipeIngredients ingredients={recipe.ingredients}/>}
          { recipe?.instructions && <RecipeInstructions instructions={recipe.instructions}/>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Vissza
        </Button>
      </DialogActions>
    </Dialog>
  );
};
