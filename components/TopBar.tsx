import { useState } from 'react';
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

type TopBarAction = {
  icon: React.ReactNode,
  label: string;
  action: (e: any) => void;
};

type TopBarProps = {
  leadingAction?: TopBarAction;
  title?: string;
  trailingActions?: TopBarAction[];
  hiddenActions?: TopBarAction[];
};

export default function TopBar({
  leadingAction,
  title,
  trailingActions,
  hiddenActions,
}: TopBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        maxWidth: '900px',
        margin: 'auto',
        zIndex: 1999,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        px: 1,
      }}
      square
    >
      { leadingAction && (
        <IconButton onClick={leadingAction.action} aria-label={leadingAction.label}>
          {leadingAction.icon}
        </IconButton>
      )}
      <span
        style={{
          paddingInline: '8px',
          marginRight: 'auto',
          fontSize: '22px',
          lineHeight: '28px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </span>
      { trailingActions && trailingActions.map(({action, label, icon}) => (
        <IconButton onClick={action} aria-label={label} key={label}>
          {icon}
        </IconButton>
      ))}
      { hiddenActions && hiddenActions.length > 0 && (
        <>
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{zIndex: 2000}}
          >
            { hiddenActions.map(({icon, label, action}) => (
              <MenuItem key={label} onClick={(e) => { action(e); }}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                {label}
              </MenuItem>
            )) }
          </Menu>
        </>
      ) }
    </Paper>
  );
}
