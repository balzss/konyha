import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';
import {
  TopBar,
} from '../components';
import { useTags } from '../dataHooks';
import useUrlParams from '../utils/useUrlParams';

export default function HomeTopBar() {
  const router = useRouter();
  const selectedTags = useUrlParams(['tags']);
  console.log(selectedTags)
  const { data: tagsData } = useTags();
  const tags = tagsData?.tags;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickAdd = () => {
    router.push('/r/add');
  };
  const handleClickSearch = () => {
    router.push('/search');
  };
  return (
    <>
      <TopBar
        leadingAction={{action: handleOpenMenu, icon: <TuneIcon/>, label: 'Menü'}}
        title="Összes recept"
        trailingActions={[
          {icon: <SearchIcon/>, action: handleClickSearch, label: 'Keresés'},
          {icon: <AddIcon/>, action: handleClickAdd, label: 'Új recept'},
        ]}
      />
      <Menu
        MenuListProps={{dense: true}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        sx={{zIndex: 2000}}
      >
        <MenuItem onClick={(e) => {}}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={true}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          Összes recept
        </MenuItem>
        <Divider />
        { tags && tags.length > 0 && tags.map(({name}) => (
          <MenuItem key={name} onClick={(e) => {}}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={false}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            {name}
          </MenuItem>
        )) }
      </Menu>
    </>
  )
}
