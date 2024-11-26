"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  createChurchFormSchema,
  createPersonFormSchema,
  createReportFormSchema,
} from "@/lib/schema";
import { saltAndHashPasword } from "@/lib/utils";
import { console } from "inspector";
import { CredentialsSignin } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createPerson = async (
  data: z.infer<typeof createPersonFormSchema>
) => {
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
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        fullname: `${data.firstname} ${(
          data.lastname as string
        ).toLocaleUpperCase()}`,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        status: data.status,
        churchId: data.churchId,
      },
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
};

export const createReport = async (
  data: z.infer<typeof createReportFormSchema>
) => {
  try {
    // console.log("data from createReport", data);
    const reportCreated = await prisma.report.create({
      data: data,
    });

    revalidatePath(`/persons/${data.personId}`);
    return {
      ok: true,
      error: null,
      data: JSON.parse(JSON.stringify(reportCreated)),
    };
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la création du rapport",
      error
    );
    return {
      ok: false,
      error:
        `Une erreur est survenue lors de la création du rapport. ${error}`.trim(),
      data: null,
    };
  }
};

// Register user
export const registerUser = async (formData: FormData) => {
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstname || !lastname || !email || !password) {
    console.error("Veuillez remplir tous les champs");
    throw new Error("Veuillez remplir tous les champs");
  }
  // Hash password
  const hashedPassword = saltAndHashPasword(password);

  // Check if user already exists
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    console.error("User already exists");
    throw new Error("User already exists");
  }

  // Create user
  await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });

  redirect("/login");
};

// Login user
export const loginUser = async (formData: FormData) => {
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  if (!email || !password) {
    console.error("Missing credentials");
    throw new Error("Missing credentials");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    console.error(someError);
    throw new Error("Invalid credentials");
  }
  redirect("/dashboard");
};

export const createChurch = async (
  data: z.infer<typeof createChurchFormSchema>,
  userId: string
) => {
  try {
    // console.log("data from createReport", data);
    const churchCreated = await prisma.church.create({
      data: {
        ...data,
        joinCode: Math.random().toString(36).substring(2, 15),
      },
    });

    // Add churchId to user
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        churchId: churchCreated.id,
      },
    });
    // revalidatePath(`/persons/${data.personId}`);
    return {
      ok: true,
      error: null,
      data: JSON.parse(JSON.stringify(churchCreated)),
    };
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la création du rapport",
      error
    );
    return {
      ok: false,
      error:
        `Une erreur est survenue lors de la création du rapport. ${error}`.trim(),
      data: null,
    };
  }
};

export const joinChurch = async (
  data: { joinCode: string },
  userId: string
) => {
  try {
    const church = await prisma.church.findFirst({
      where: {
        joinCode: data.joinCode,
      },
    });

    if (!church) {
      console.error("L'église n'existe pas");
      return {
        ok: false,
        error: "L'église n'existe pas",
        data: null,
      };
    }

    // Add churchId to user
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        churchId: church.id,
        churchIds: {
          push: church.id,
        },
      },
    });

    return {
      ok: true,
      error: null,
      data: JSON.parse(JSON.stringify(church)),
    };
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la création du rapport",
      error
    );
    return {
      ok: false,
      error:
        `Une erreur est survenue lors de la création du rapport. ${error}`.trim(),
      data: null,
    };
  }
};

export async function getUserChurchId(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  if (!user.churchId) {
    if (user.churchIds.length > 0) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          churchId: user.churchIds[0],
        },
      });
      return user.churchIds[0];
    }
    return null;
  }

  if (user.churchIds.length === 0) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        churchIds: {
          push: user.churchId,
        },
      },
    });
    return user.churchId;
  }

  return user.churchId;
}

export async function getUserChurchIds(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  return user.churchIds;
}
