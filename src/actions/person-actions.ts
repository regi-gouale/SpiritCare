"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { createPersonFormSchema } from "@/lib/schema";
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
