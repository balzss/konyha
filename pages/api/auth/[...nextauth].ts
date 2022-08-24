import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../prisma/prisma-client';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, user }: {session: any, user: any}) {
      session.userId = user.id;
      const theme = user?.preferences?.theme;
      if (theme) {
        session.theme = theme;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});
