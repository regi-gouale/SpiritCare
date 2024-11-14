"use server";

import { prisma } from "@/lib/prisma";
import { createPersonFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function createPersonAction(formData: FormData) {
  const validatedData = createPersonFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedData.success) {
    console.error(validatedData.error);
    // throw new Error(JSON.stringify(validatedData.error));
    return;
  }

  try {
    // Vérifier que la personne n'existe pas déjà
    const person = await prisma.person.findFirst({
      where: {
        email: validatedData.data.email,
      },
    });

    if (person) {
      console.error("La personne existe déjà");
      // throw new Error("La personne existe déjà");
      return;
    }

    await prisma.person.create({
      data: validatedData.data,
    });

    revalidatePath("/");

    // return response as Person;
  } catch {
    console.error("Une erreur est survenue lors de la création de la personne");
    // throw new Error(
    //   "Une erreur est survenue lors de la création de la personne"
    // );
    return;
  }
}
