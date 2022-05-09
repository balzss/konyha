import {
  Link as MuiLink,
} from '@mui/material';
import NextLink from 'next/link';

type LinkProps = {
  href: string;
  children: React.ReactNode,
};

export default function Link({
  href,
  children,
}: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <MuiLink variant="body2" underline="hover">{children}</MuiLink>
    </NextLink>
  );
}
