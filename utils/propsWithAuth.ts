import type { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export async function propsWithAuth(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
  return {
    props: {
      session,
    }
  };
};
