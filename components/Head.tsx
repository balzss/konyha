import { default as NextHead } from 'next/head';

type HeadProps = {
  title: string;
};

export default function Head({
  title,
}: HeadProps) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="mobile-web-app-capable" content="yes"/>
      <link rel="icon" type="image/png" href="/logo64.png" />
    </NextHead>
  )
}
