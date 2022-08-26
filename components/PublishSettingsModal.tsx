import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  Switch,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 'calc(100% - 56px)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '28px',
  p: 3,
};

export type PublishOptions = {
  publishId: string;
  publishState: boolean;
}

type PublishSettingsModalProps = {
  publishOptions: {
    status: 'PUBLISHED' | 'LOADING' | 'ERROR';
    publishId?: string;
    message: React.ReactNode;
  };
  handleClose: () => void;
  handlePublish: (publishOptions: PublishOptions) => void;
};

export default function PublishSettingsModal({
  publishOptions,
  handleClose,
  handlePublish,
}: PublishSettingsModalProps) {
  const [publishIdValue, setPublishIdValue] = useState<string>(publishOptions.publishId || '');
  const [publishStateSwitch, setPublishStateSwitch] = useState<boolean>(publishOptions.status === 'PUBLISHED');

  const handleSwitch = (e: any) => {
    setPublishStateSwitch(e.target.checked);
    publish();
  };

  const publish = () => {
    handlePublish({
      publishId: publishIdValue,
      publishState: publishStateSwitch,
    });
  };

  return (
    <Modal
      open
      onClose={(_, reason) => reason === 'backdropClick' ? null : handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{zIndex: 9999}}
    >
      <Box sx={modalStyle}>
        <Typography component="h2" sx={{fontWeight: 400, fontSize: '24px', marginBottom: '16px'}}>
          Publish options
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Publish static site" />
            <Switch
              edge="end"
              disabled={publishOptions.status === 'LOADING'}
              onChange={handleSwitch}
              checked={publishStateSwitch}
            />
          </ListItem>
          <ListItem disablePadding>
          <TextField
            label="Publish ID"
            variant="outlined"
            margin="normal"
            disabled={publishOptions.status === 'LOADING'}
            value={publishIdValue}
            onChange={(e: any) => setPublishIdValue(e.target.value)}
            sx={{width: '100%'}}
          />
          </ListItem>
        </List>
        <Typography component="div" sx={{fontWeight: 400, fontSize: '14px', margin: '8px 0', display: 'flex' }}>
          {publishOptions.status === 'PUBLISHED' ? (
            <CheckCircleIcon fontSize="small" sx={{mr: 0.5}}/>
          ) : (publishOptions.status === 'LOADING') ? (
            <RefreshIcon className="rotate" fontSize="small" sx={{mr: 0.5}}/>
          ) : (
            <CancelIcon fontSize="small" sx={{mr: 0.5}}/>
          )}
          {publishOptions.message}
        </Typography>
        <Stack direction="row-reverse" spacing={3} sx={{mt: 3}}>
          <Button 
            onClick={publish} 
            variant="outlined"
            disabled={publishOptions.status === 'LOADING'}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
