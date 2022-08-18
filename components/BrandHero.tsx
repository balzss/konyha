import Image from 'next/image';
import {
  Typography,
} from '@mui/material';
import NextLink from 'next/link';

export default function BrandHero() {
  return (
    <NextLink href="/" passHref>
      <a style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', paddingInline: '16px'}}>
        <Image src="/logo128.png" alt="logo" width="80" height="80"/>
        <Typography variant="h4" component="div" sx={{minWidth: '300px', textAlign: 'center'}}>
          Konyha Recipe Manager
        </Typography>
      </a>
    </NextLink>
  );
}
