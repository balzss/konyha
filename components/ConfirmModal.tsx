import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';

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

type ConfirmModalProps = {
  open: boolean;
  title: string;
  desription?: string;
  confirmText: string;
  handleClose: () => void;
  handleConfirm: (e: React.SyntheticEvent) => void;
};

export default function ConfirmModal({
  open,
  title,
  desription,
  confirmText,
  handleClose,
  handleConfirm,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{zIndex: 9999}}
    >
      <Box sx={modalStyle}>
        { title && (
          <Typography component="h2" sx={{fontWeight: 400, fontSize: '24px', marginBottom: '16px'}}>
            {title}
          </Typography>
        ) }
        { desription && (
          <Typography sx={{color: '#CAC4D0'}}>
            {desription}
          </Typography>
        ) }
        <Stack direction="row-reverse" spacing={3} sx={{mt: 3}}>
          <Button onClick={handleConfirm} variant="outlined">{confirmText}</Button>
          <Button onClick={handleClose}>Mégse</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
