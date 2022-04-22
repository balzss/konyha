import {
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';

export default function BrandHero() {
  return (
    <Link to="/" underline="none" component={NextLink as any} sx={{color: 'inherit'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', paddingInline: '16px'}}>
        <img src="/logo128.png" alt="" style={{width: '80px'}}/>
        <Typography variant="h4" component="div" sx={{minWidth: '300px', textAlign: 'center'}}>
          Konyha Recept Manager
        </Typography>
      </div>
    </Link>
  );
}
