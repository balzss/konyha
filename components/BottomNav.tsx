import { useRouter } from 'next/router';
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

import {
  MenuBook as MenuBookIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

const bottomNavItems = [
  {
    displayName: 'Recipes',
    icon: <MenuBookIcon />,
    path: '/',
    disabled: false,
  },
  {
    displayName: 'Groceries',
    icon: <LocalGroceryStoreIcon />,
    path: '/groceries',
    disabled: false,
  },
  // {
  //   displayName: 'Timers',
  //   icon: <TimerIcon />,
  //   path: '/',
  //   disabled: true,
  // },
  {
    displayName: 'Profile',
    icon: <AccountCircleIcon />,
    path: '/profile',
    disabled: false,
  },
];

export default function BottomBar() {
  const router = useRouter();
  const currentPage = bottomNavItems.map((item) => item.path).indexOf(router.pathname);

  return (
    <BottomNavigation
      showLabels
      value={currentPage}
      onChange={(_event, newValue: number) => {
        router.push(bottomNavItems[newValue].path);
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1000,
        bgcolor: 'background.default',
      }}
    >
      {bottomNavItems.map(({displayName, icon, disabled}) => (
        <BottomNavigationAction key={displayName} label={displayName} icon={icon} disabled={disabled}/>
      ))}
    </BottomNavigation>
  );
}
