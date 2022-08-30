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
  PublishSettingsModal,
  Link,
} from '../components/';
import { propsWithAuth } from '../utils/propsWithAuth';
import { 
  useGetMe,
  useLazyRecipes,
  useUpdateUserPreferences,
  usePublishSite,
} from '../dataHooks';
import type { PublishOptions } from '../components/PublishSettingsModal';

type ProfilePageArgs = {
  session: Session,
}

function handleDownloadRecipes(recipesData: any) {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(recipesData, null, 2)
  )}`;
  const link = document.createElement('a');
  link.href = jsonString;
  link.download = `konyha-data-export_${new Date().toLocaleDateString('sv')}.json`;
  link.click();
};

function getPublishModalMessage({publishLoading, publishId, published, publishSiteError}: any) {
  const publishDomain = process.env.NEXT_PUBLIC_SITEGEN_DOMAIN;
  if (publishSiteError) {
    return publishSiteError.toString();
  } else if (publishLoading) {
    return 'Updating site...'
  } else if (published) {
    return <>
      Site published at{'\u00A0'}
      <Link blank href={`${publishDomain}/r/${publishId}`}>
        {publishDomain}/{publishId}
      </Link>
    </>;
  } else if (!publishLoading && !published) {
    return 'Site not published';
  } else {
    return '';
  }
}

export default function ProfilePage({session}: ProfilePageArgs) {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const userThemePreference = sessionData?.theme;
  const { data: meData } = useGetMe();
  const email = meData?.me.email;
  const publishOptions = meData?.me.publishOptions;
  const [getRecipes, {error: getRecipesError, data: recipesData}] = useLazyRecipes(handleDownloadRecipes);
  const [updatePreferences] = useUpdateUserPreferences();
  const [publishSite, {error: publishSiteError, loading: publishLoading}] = usePublishSite();
  const [darkMode, setDarkMode] = useState<boolean>(userThemePreference === 'dark');
  const [downloadConfirmOpen, setDownloadConfirmOpen] = useState<boolean>(false);
  const [publishSettingsOpen, setPublishSettingsOpen] = useState<boolean>(false);
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

  const handleSitePublish = async (siteOptions: PublishOptions) => {
    console.log(siteOptions);
    const { published, publishId } = siteOptions;
    try {
      await publishSite({variables: {
        publishOptions: {
          published,
          publishId,
        }
      }});
    } catch (e) {
      console.log({e})
    }
  };

  // TODO separate PUBLISHED and ERROR states so they can happen at the same time
  const publishModalStatus = publishLoading ? 'LOADING' : publishOptions?.published && !publishSiteError ? 'PUBLISHED' : 'ERROR';
  const publishId = publishOptions?.publishId || '';
  const publishModalMessage = getPublishModalMessage({publishLoading, publishId, published: publishOptions?.published, publishSiteError});

  return (
    <div style={{maxWidth: '900px', margin: '0 auto'}}>
      <List
        sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.default', p: 1}}
      >
        <Head title="Személyes"/>
        <ListItem>
          <ListItemText primary="Email" secondary={email || 'n/a'}/>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setPublishSettingsOpen(true)}>
            <ListItemText primary="Public site" secondary={publishOptions?.published ? `Published at ${publishOptions.publishId}`: '<not published>'}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => alert('Importing is not yet implemented')}>
            <ListItemText primary="Import from json" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setDownloadConfirmOpen(true)}>
            <ListItemText primary="Export data" />
          </ListItemButton>
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
      <ConfirmModal
        open={downloadConfirmOpen}
        title={'Export'}
        description={'Export all data to json'}
        handleClose={() => setDownloadConfirmOpen(false)}
        handleConfirm={() => getRecipes()}
        confirmText={'Download'}
      />
      {publishSettingsOpen && (
        <PublishSettingsModal 
          publishId={publishId}
          message={publishModalMessage}
          status={publishModalStatus}
          handleClose={() => setPublishSettingsOpen(false)}
          handlePublish={handleSitePublish}
        />
      )}
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
