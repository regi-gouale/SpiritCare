import { Role } from "@prisma/client";
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
            churchId: true,
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
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60,
  //   updateAge: 24 * 60 * 60,
  // },
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.churchId = user.churchId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      session.user.email = token.email as string;
      session.user.firstname = token.firstname as string;
      session.user.lastname = token.lastname as string;
      session.user.churchId = token.churchId as string;
      return session;
    },
  },
});
