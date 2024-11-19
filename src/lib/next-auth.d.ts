import { Role } from "@prisma/client";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      email: string;
      firstname: string;
      lastname: string;
    } & DefaultSession["user"];
  }
}
