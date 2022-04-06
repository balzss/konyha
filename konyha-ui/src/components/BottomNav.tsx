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

export default function BottomBar({
  currentPage = 0,
  setCurrentPage,
}: BottomBarProps) {
  return (
    <BottomNavigation
      showLabels
      value={currentPage}
      onChange={(_event, newValue: number) => {
        setCurrentPage(newValue);
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <BottomNavigationAction label="Receptek" icon={<MenuBookIcon />} />
      <BottomNavigationAction label="Bevásárlás" icon={<LocalGroceryStoreIcon />} disabled/>
      <BottomNavigationAction label="Új recept" icon={<NoteAddIcon />}/>
      <BottomNavigationAction label="Időzítők" icon={<TimerIcon />} disabled/>
    </BottomNavigation>
  );
}
