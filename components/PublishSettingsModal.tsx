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

type PublishSettingsModalProps = {
  open: boolean;
  handleClose: () => void;
  publishStatus: 'SUCCESS' | 'LOADING' | 'ERROR';
  message: React.ReactNode;
  handlePublish: (e: React.SyntheticEvent) => void;
};

export default function PublishSettingsModal({
  open,
  handleClose,
  publishStatus,
  message,
  handlePublish,
}: PublishSettingsModalProps) {
  return (
    <Modal
      open={open}
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
              onChange={() => {}}
              checked={publishStatus === 'SUCCESS'}
            />
          </ListItem>
          <ListItem disablePadding>
          <TextField
            label="Publish ID"
            variant="outlined"
            margin="dense"
            sx={{width: '100%'}}
          />
          </ListItem>
        </List>
        <Typography component="div" sx={{fontWeight: 400, fontSize: '14px', margin: '8px 0', display: 'flex' }}>
          {publishStatus === 'SUCCESS' ? (
            <CheckCircleIcon fontSize="small" sx={{mr: 0.5}}/>
          ) : (publishStatus === 'LOADING') ? (
            <RefreshIcon className="rotate" fontSize="small" sx={{mr: 0.5}}/>
          ) : (
            <CancelIcon fontSize="small" sx={{mr: 0.5}}/>
          )}
          {message}
        </Typography>
        <Stack direction="row-reverse" spacing={3} sx={{mt: 3}}>
          <Button onClick={handlePublish} variant="outlined">Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
