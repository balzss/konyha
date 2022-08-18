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
import getTagsFromUrl from '../utils/getTagsFromUrl';

export default function HomeTopBar() {
  const router = useRouter();
  const selectedTags = getTagsFromUrl(router);
  const { data: tagsData } = useTags();
  const tags = tagsData?.tags;
  const title = selectedTags.length ? selectedTags.map((tagSlug) => tags?.find(({slug}) => tagSlug === slug)?.name).join(', ') : 'All recipes';
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
  const handleSelectTag = (tagSlug: string) => {
    const newSelection = selectedTags.includes(tagSlug) ? selectedTags.filter(tag => tag !== tagSlug) : [...selectedTags, tagSlug];
    router.push(
      {
        pathname: '/',
        query: {
          ...(newSelection.length && { tags: newSelection.join(' ')})
        }
      },
    );
  };
  return (
    <>
      <TopBar
        leadingAction={{action: handleOpenMenu, icon: <TuneIcon/>, label: 'Menu'}}
        title={title}
        trailingActions={[
          {icon: <SearchIcon/>, action: handleClickSearch, label: 'Search'},
          {icon: <AddIcon/>, action: handleClickAdd, label: 'New recipe'},
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
        <MenuItem onClick={(e) => router.push('/')}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={!selectedTags.length}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          All recipes
        </MenuItem>
        { tags && tags.length > 0 && (
          <>
            <Divider />
            { tags.map(({name, slug}) => (
              <MenuItem key={slug} onClick={() => handleSelectTag(slug)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedTags.includes(slug)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                {name}
              </MenuItem>
            )) }
          </>
        )}
      </Menu>
    </>
  )
}
