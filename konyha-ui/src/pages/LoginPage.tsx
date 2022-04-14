import { useState } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        pt: 6,
      }}
    >
      <Container maxWidth="sm">
        <Link to="/" underline="none" component={RouterLink as any} sx={{color: 'inherit'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', paddingInline: '16px'}}>
            <img src="/logo128.png" alt="" />
            <Typography variant="h4" component="div" sx={{minWidth: '300px', textAlign: 'center'}}>
              Konyha Recept Manager
            </Typography>
          </div>
        </Link>
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
            <Link variant="body2" to="/" underline="hover" component={RouterLink as any} sx={{textAlign: 'center'}}>Elfelejtettem a jelszavam</Link>
          </CardContent>
          <CardActions sx={{px: 2, pb: 2, justifyContent: 'flex-end'}}>
            <Button variant="outlined">Bejelentkezés</Button>
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
