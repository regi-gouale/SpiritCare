"use server";

import { prisma } from "@/lib/prisma";
import { Person } from "@prisma/client";

export async function getPersonsAction(): Promise<Person[] | Error> {
  try {
    const allPersons = await prisma.person.findMany({
      orderBy: {
        lastname: "asc",
      },
      // select: {
      //   firstname: true,
      //   lastname: true,
      //   fullname: true,
      //   email: true,
      //   phone: true,
      //   dateOfBirth: true,
      //   gender: true,
      //   status: true,
      // },
    });
    return JSON.parse(JSON.stringify(allPersons)) as Person[];
  } catch (error) {
    console.error(error);
    return error as Error;
  }
}
