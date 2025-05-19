import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const secret = process.env.API_AUTH_SECRET;

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "thirdweb",
      credentials: { walletAddress: { label: "walletAddress", type: "text" } },
      async authorize(prop) {
        if (!prop?.walletAddress) throw new Error("Invalid wallet");

        return {
          id: prop?.walletAddress,
          username: prop?.walletAddress,
          env: process.env.NODE_ENV,
        };
      },
    }),
  ],
  secret,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.id as string;
      // session.user.username = token.username as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);
