import { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
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
import Link from '../components/Link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
            <TextField
              label="Jelszó"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password}
              type="password"
              onChange={({target}) => setPassword(target.value)}
              helperText={<Link href="/">Elfelejtett jelszó?</Link>}
            />
          </CardContent>
          <CardActions sx={{px: 2, pb: 2, justifyContent: 'space-between'}}>
            <Stack direction="row" spacing={1}>
              <NextLink href="/api/auth/signin" passHref>
                <IconButton aria-label="github-login">
                  <GitHubIcon />
                </IconButton>
              </NextLink>
              <NextLink href="/api/auth/signin" passHref>
                <IconButton aria-label="google-login">
                  <GoogleIcon />
                </IconButton>
              </NextLink>
            </Stack>
            <Button variant="outlined" onClick={handleLogin}>Bejelentkezés</Button>
          </CardActions>
        </Card>
        <Typography variant="body2" component="div" sx={{mt: 1, textAlign: 'center'}}>
          <span>Nincs még fiókod? </span>
          <Link href="/signup">Regisztrálj!</Link>
        </Typography>
      </Container>
    </Box>
  );
}
