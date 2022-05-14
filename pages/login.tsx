import { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Stack,
  IconButton,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import BrandHero from '../components/BrandHero';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  const handleLogin = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        pt: 4,
      }}
    >
      <Container maxWidth="sm">
        <BrandHero/>
        <Card variant="outlined" sx={{bgcolor: 'background.paper', mt: 4}}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              Bejelentkezés
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              required
              fullWidth
              value={email}
              onChange={({target}) => setEmail(target.value)}
            />
          </CardContent>
          <CardActions sx={{px: 2, pb: 2, justifyContent: 'space-between'}}>
            <Stack direction="row" spacing={1}>
              <NextLink href="/api/auth/signin" passHref>
                <IconButton aria-label="github-login" onClick={() => signIn('github', {callbackUrl: '/'})}>
                  <GitHubIcon />
                </IconButton>
              </NextLink>
              <NextLink href="/api/auth/signin" passHref>
                <IconButton aria-label="google-login" onClick={() => signIn('google', {callbackUrl: '/'})}>
                  <GoogleIcon />
                </IconButton>
              </NextLink>
            </Stack>
            <Button variant="outlined" onClick={handleLogin}>Bejelentkezés</Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}
