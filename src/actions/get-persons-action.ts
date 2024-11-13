"use server";

import { prisma } from "@/lib/prisma";
import { Person } from "@prisma/client";

export async function getPersonsAction(): Promise<Person[] | Error> {
  try {
    const allPersons = await prisma.person.findMany();
    return JSON.parse(JSON.stringify(allPersons)) as Person[];
  } catch (error) {
    console.error(error);
    return error as Error;
  }
}
