import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

export default function UserPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const colorMode = localStorage.getItem('colorMode');
    setDarkMode(colorMode === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('colorMode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.default', margin: 'auto', p: 1}}
    >
      <ListItem>
        <ListItemText primary="Email" secondary="test1@email.com" />
      </ListItem>
      <ListItem>
        <ListItemText id="switch-list-label-wifi" primary="Sötét mód" />
        <Switch
          edge="end"
          onChange={({target}) => setDarkMode(target.checked)}
          checked={darkMode}
          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton >
          <ListItemText primary="Kreditek" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={handleSignOut}>
          <ListItemText primary="Kijelentkezés" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
