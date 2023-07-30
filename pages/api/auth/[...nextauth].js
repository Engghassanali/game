import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
 providers: [
  GoogleProvider({
   clientId:'228215303308-orebjvddn5u465ummili56icm89q66ce.apps.googleusercontent.com',
   clientSecret: "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",
  }),
 ],
 session: {
  strategy: 'jwt',
  maxAge  : 1*60,
 },
};
export default NextAuth(authOptions);