import { ReactElement, useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import {
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import Layout from '../components/Layout'
import { propsWithAuth } from '../utils/propsWithAuth';

export default function ProfilePage() {
  const user = {
    id: '11',
    email: 'hali@ga.li',
  };
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const colorMode = localStorage.getItem('colorMode');
    setDarkMode(colorMode === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('colorMode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSignOut = () => {
    signOut({callbackUrl: '/login'});
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.default', margin: 'auto', p: 1}}
    >
      <ListItem>
        <ListItemText primary="Email" secondary={user?.email || 'n/a'}/>
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

ProfilePage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export const getServerSideProps = propsWithAuth;
