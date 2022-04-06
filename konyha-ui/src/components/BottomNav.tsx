import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

type BottomBarProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function BottomBar({
  currentPage = 0,
  setCurrentPage
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
      <BottomNavigationAction label="Bevásárlás" icon={<LocalGroceryStoreIcon />} />
      <BottomNavigationAction label="Új recept" icon={<NoteAddIcon />} />
    </BottomNavigation>
  );
}
