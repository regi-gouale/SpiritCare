import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Adresse e-mail", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin("Missing credentials");
        }
        let user = null;

        user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            password: true,
            role: true,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        if (!user.password) {
          throw new Error("No password set");
        }

        const isMatch = await compare(password as string, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/login",
    // error: "/login",
  },
});
