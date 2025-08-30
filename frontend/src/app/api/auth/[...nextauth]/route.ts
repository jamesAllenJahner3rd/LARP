import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client"; // Adjust the import path as necessary
import { adapter } from "next/dist/server/web/adapter";

// This had to be removed from the handler and exported to the main page so that we can get session data to the server
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // session: {
  //   strategy: "jwt",
  // }, Doesn't seem to be necessary anymore...
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // It is known that with a rout file you have to export Gets and posts and puts and deletes So we need this line
// What we're doing is exposing a bunch of endpoints that start with /auth
