import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

import {
  MenuBook as MenuBookIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  NoteAdd as NoteAddIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';

type BottomBarProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

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
    displayName: 'Új recept',
    icon: <NoteAddIcon />,
    path: '/add',
    disabled: false,
  },
  {
    displayName: 'Időzítők',
    icon: <TimerIcon />,
    path: '/',
    disabled: true,
  },
];

export default function BottomBar({
  currentPage = 0,
  setCurrentPage,
}: BottomBarProps) {
  const navigate = useNavigate();
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
      }}
    >
      {bottomNavItems.map(({displayName, icon, disabled}) => (
        <BottomNavigationAction key={displayName} label={displayName} icon={icon} disabled={disabled}/>
      ))}
    </BottomNavigation>
  );
}
