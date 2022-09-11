import { default as NextHead } from 'next/head';

type HeadProps = {
  title: string;
};

export default function Head({ title }: HeadProps) {
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
}
