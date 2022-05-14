import { useRouter } from 'next/router';

export default function useUrlParams(keys: string[]) {
  const router = useRouter();
  const params = keys.map((key) => router?.query?.[key]?.toString().split(',')).filter((param) => param);
  return params;
}
