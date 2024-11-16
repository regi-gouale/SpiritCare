"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { createPersonFormSchema } from "@/lib/schema";
import { Person } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPersonAction(
  data: z.infer<typeof createPersonFormSchema>
) {
  try {
    // Vérifier que la personne n'existe pas déjà
    const person = await prisma.person.findFirst({
      where: {
        email: data.email,
      },
    });

    if (person) {
      console.error("La personne existe déjà");
      return {
        ok: false,
        error: "La personne existe déjà",
        data: null,
      };
    }

    const personCreated = await prisma.person.create({
      data: data,
    });

    revalidatePath("/");
    return {
      ok: true,
      error: null,
      data: JSON.parse(JSON.stringify(personCreated)),
    };
  } catch {
    console.error("Une erreur est survenue lors de la création de la personne");
    return {
      ok: false,
      error: "Une erreur est survenue lors de la création de la personne",
      data: null,
    };
  }
}

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