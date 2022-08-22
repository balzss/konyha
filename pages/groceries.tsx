import {
  Typography,
  Alert,
  AlertTitle,
  Container,
  Box
} from '@mui/material';
import {
  BottomNav,
} from '../components';

export default function GroceriesPage() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        pt: 2,
      }}
    >
      <Container maxWidth="md" sx={{px: 2}}>
        <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          Groceries
        </Typography>
        <Alert variant="outlined" severity="warning" sx={{mt: 2}}>
          <AlertTitle>Work in progress</AlertTitle>
          You&apos;ll be able to manage your groceries list here.
        </Alert>
      </Container>
      <BottomNav/>
    </Box>
  )
}
