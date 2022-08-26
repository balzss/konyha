import {
  Link as MuiLink,
} from '@mui/material';
import NextLink from 'next/link';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  blank?: boolean;
};

export default function Link({
  href,
  children,
  blank,
}: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <MuiLink target={blank ? '_blank' : '_self'} variant="body2" underline="hover">{children}</MuiLink>
    </NextLink>
  );
}
