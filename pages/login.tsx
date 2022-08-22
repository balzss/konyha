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
  Button,
  TextField,
  Stack,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import {
  Head,
  BrandHero,
} from '../components';

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
      <Head title="Login"/>
      <Container maxWidth="sm">
        <BrandHero/>
        <Card variant="outlined" sx={{bgcolor: 'background.paper', mt: 4}}>
          <CardContent>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                Login
              </Typography>
              <TextField
                disabled
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                required
                fullWidth
                value={email}
                onChange={({target}) => setEmail(target.value)}
              />
              <Button 
                variant="outlined" 
                onClick={handleLogin} 
                sx={{minWidth: '240px', alignSelf: 'center'}}
                disabled
              >
                Link küldése
              </Button>
              <Typography variant="caption" sx={{textAlign: 'center'}}>
                vagy
              </Typography>
              <Stack direction="row" spacing={2} sx={{justifyContent: 'center'}}>
                <NextLink href="/api/auth/signin" passHref>
                  <Button variant="text" startIcon={<GitHubIcon />} onClick={() => signIn('github', {callbackUrl: '/'})}>
                    Github
                  </Button>
                </NextLink>
                <NextLink href="/api/auth/signin" passHref>
                  <Button variant="text" startIcon={<GoogleIcon />} onClick={() => signIn('google', {callbackUrl: '/'})}>
                    Google
                  </Button>
                </NextLink>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
