import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client"; // Adjust the import path as necessary
import { adapter } from "next/dist/server/web/adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { email } from "zod";
import bcrypt from "bcryptjs";

// This had to be removed from the handler and exported to the main page so that we can get session data to the server
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;
        // Here you would validate the password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.passwordHash!
        );
        if (!passwordMatch) return null;
        else return user;
      },
    }),
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
