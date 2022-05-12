import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import {
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { Layout } from '../components/';
import { propsWithAuth } from '../utils/propsWithAuth';
import { useUpdateUserPreferences } from '../dataHooks';

type ProfilePageArgs = {
  session: Session,
}

export default function ProfilePage({session}: ProfilePageArgs) {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const userThemePreference = sessionData?.theme;

  const [updatePreferences] = useUpdateUserPreferences();
  const [darkMode, setDarkMode] = useState<boolean>(userThemePreference === 'dark');

  const handleSignOut = () => {
    signOut({callbackUrl: '/login'});
  };

  const handleChangeTheme = async ({target}: any) => {
    setDarkMode(target.checked);
    await updatePreferences({variables: {
      preferences: {
        theme: target.checked ? 'dark' : 'light',
      }
    }});
    router.reload();
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.default', margin: 'auto', p: 1}}
    >
      <ListItem>
        <ListItemText primary="Email" secondary={session?.user?.email || 'n/a'}/>
      </ListItem>
      <ListItem>
        <ListItemText id="switch-list-label-wifi" primary="Sötét mód" />
        <Switch
          edge="end"
          onChange={handleChangeTheme}
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
