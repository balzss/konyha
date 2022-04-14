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

export default function SignUpPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
        pt: 12,
      }}
    >
      <Container maxWidth="sm">
        <Card variant="outlined" sx={{bgcolor: 'background.paper'}}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              Regisztráció
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={({target}) => setEmail(target.value)}
            />
          </CardContent>
          <CardActions sx={{px: 2, pb: 2, flexDirection: 'row-reverse'}}>
            <Button variant="outlined">Tovább</Button>
          </CardActions>
        </Card>
        <Typography variant="body2" component="div" sx={{mt: 1, textAlign: 'center'}}>
          <span>Van már fiókod? </span>
          <Link to="/login" underline="hover" component={RouterLink as any}>Jelentkezz be!</Link>
        </Typography>
      </Container>
    </Box>
  );
}