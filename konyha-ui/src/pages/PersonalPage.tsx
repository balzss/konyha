import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';

export default function RecipeDetails() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const colorMode = localStorage.getItem('colorMode');
    setDarkMode(colorMode === 'dark');
  }, []);

  const handleColorModeChange = ({target}: {target: {checked: boolean}}) => {
    setDarkMode(target.checked);
    localStorage.setItem('colorMode', target.checked ? 'dark' : 'light');
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        minHeight: '100%',
        p: 3,
      }}
    >
      <Container>
        <Typography variant="h5" component="h1" sx={{pb: 2}}>
          Beállítások
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={handleColorModeChange}
              name="darkMode"
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Sötét mód"
        />
      </Container>
    </Box>
  );
};
