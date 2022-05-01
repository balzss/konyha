import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken';

export default NextAuth({
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      checks: 'both',
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encode: async (encodeParams) => {
      const {token, secret} = encodeParams;
      const jwtClaims = {
        "sub": token?.sub?.toString() ,
        "name": token?.name ,
        "email": token?.email,
        "iat": Date.now() / 1000,
        "exp": Math.floor(Date.now() / 1000) + (24*60*60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token?.id,
        }
      };
      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'HS256'});
      return encodedToken;
    },
    decode: async (decodeParams): Promise<any> => {
      const {token, secret} = decodeParams;
      if (!token) return null;
      const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256']});
      return decodedToken;
    },
  },
  callbacks: {
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    async session(sessionParams) { 
      const { session, token } = sessionParams;
      const encodedToken = jwt.sign(token, process.env.NEXTAUTH_SECRET as string, { algorithm: 'HS256'});
      session.id = token.id;
      session.token = encodedToken;
      return Promise.resolve(session);
    },
    async jwt(jwtParams) { 
      const { token, user } = jwtParams;
      if (user) { // if user is signed in
        token.id = user?.id.toString();
      }
      return Promise.resolve(token);
    }
  },
})
