import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Link,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from '@mui/material';
import BrandHero from '../components/BrandHero';
import { Link as RouterLink } from 'react-router-dom';
import { loginUser } from '../utils/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    loginUser({identifier: email, password});
    navigate('/');
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
              label="Felhasználónév"
              variant="outlined"
              margin="normal"
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
            />
            <Link variant="body2" to="/" underline="hover" component={RouterLink as any} sx={{textAlign: 'center'}}>Elfelejtett jelszó?</Link>
          </CardContent>
          <CardActions sx={{px: 2, pb: 2, justifyContent: 'flex-end'}}>
            <Button variant="outlined" onClick={handleLogin}>Bejelentkezés</Button>
          </CardActions>
        </Card>
        <Typography variant="body2" component="div" sx={{mt: 1, textAlign: 'center'}}>
          <span>Nincs még fiókod? </span>
          <Link to="/signup" underline="hover" component={RouterLink as any}>Regisztrálj!</Link>
        </Typography>
      </Container>
    </Box>
  );
}
