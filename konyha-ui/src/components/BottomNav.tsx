import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

import {
  MenuBook as MenuBookIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  AccountCircle as AccountCircleIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';

const bottomNavItems = [
  {
    displayName: 'Receptek',
    icon: <MenuBookIcon />,
    path: '/',
    disabled: false,
  },
  {
    displayName: 'Bevásárlás',
    icon: <LocalGroceryStoreIcon />,
    path: '/',
    disabled: true,
  },
  {
    displayName: 'Időzítők',
    icon: <TimerIcon />,
    path: '/',
    disabled: true,
  },
  {
    displayName: 'Személyes',
    icon: <AccountCircleIcon />,
    path: '/me',
    disabled: false,
  },
];

export default function BottomBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(bottomNavItems.map((item) => item.path).indexOf(pathname));

  return (
    <BottomNavigation
      showLabels
      value={currentPage}
      onChange={(_event, newValue: number) => {
        navigate(bottomNavItems[newValue].path);
        setCurrentPage(newValue);
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1000,
        bgcolor: 'background.paper',
      }}
    >
      {bottomNavItems.map(({displayName, icon, disabled}) => (
        <BottomNavigationAction key={displayName} label={displayName} icon={icon} disabled={disabled}/>
      ))}
    </BottomNavigation>
  );
}
