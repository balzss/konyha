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
import { 
  Head,
  Layout,
  ConfirmModal,
} from '../components/';
import { propsWithAuth } from '../utils/propsWithAuth';
import { useGetMe, useUpdateUserPreferences } from '../dataHooks';

type ProfilePageArgs = {
  session: Session,
}

export default function ProfilePage({session}: ProfilePageArgs) {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const userThemePreference = sessionData?.theme;
  const { data: meData } = useGetMe();
  const email = meData?.me.email;
  const publishId = meData?.me.publishid;

  const [updatePreferences] = useUpdateUserPreferences();
  const [darkMode, setDarkMode] = useState<boolean>(userThemePreference === 'dark');
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState<boolean>(false);

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
    <div style={{maxWidth: '900px', margin: '0 auto'}}>
      <List
        sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.default', p: 1}}
      >
        <Head title="Személyes"/>
        <ListItem>
          <ListItemText primary="Email" secondary={email || 'n/a'}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Publish ID" secondary={publishId || '<not published>'}/>
        </ListItem>
        <ListItem>
          <ListItemText id="switch-list-label-wifi" primary="Dark mode" />
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
          <ListItemButton onClick={() => setLogoutConfirmOpen(true)}>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
      <ConfirmModal
        open={logoutConfirmOpen}
        title={'Log out'}
        description={'Are you sure to log out?'}
        handleClose={() => setLogoutConfirmOpen(false)}
        handleConfirm={handleSignOut}
        confirmText={'Log out'}
      />
    </div>
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
