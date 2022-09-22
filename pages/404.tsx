import { Container, Box, Typography } from '@mui/material';
import { Head, Link } from '../components';

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        height: '100%',
        pt: 4,
      }}
    >
      <Head title="Page Not Found" />
      <Container maxWidth="sm">
        <Typography variant="h4">404</Typography>
        <Typography variant="h5">Page Not Found</Typography>
        <div style={{ paddingTop: '24px' }}>
          <Link href="/">Go home</Link>
        </div>
      </Container>
    </Box>
  );
}
