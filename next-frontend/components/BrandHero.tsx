import Image from 'next/image';
import {
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';

export default function BrandHero() {
  return (
    <Link href="/" underline="none" component={NextLink as any} sx={{color: 'inherit'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', paddingInline: '16px'}}>
        <Image src="/logo128.png" alt="logo" width="80" height="80"/>
        <Typography variant="h4" component="div" sx={{minWidth: '300px', textAlign: 'center'}}>
          Konyha Recept Manager
        </Typography>
      </div>
    </Link>
  );
}
