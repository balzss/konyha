import {
  Paper,
  IconButton,
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
  return (
    <Paper
      elevation={0} 
      sx={{
        bgcolor: '#1C1B1F',
        color: '#E6E1E5',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
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
        style={{paddingLeft: '8px', marginRight: 'auto', fontSize: '22px', lineHeight: '28px'}}
      >
        {title}
      </span>
      { trailingActions && trailingActions.map(({action, label, icon}) => (
        <IconButton onClick={action} aria-label={label}>
          {icon}
        </IconButton>
      ))}
      { hiddenActions && hiddenActions.length > 0 && (
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ) }
    </Paper>
  );
}
