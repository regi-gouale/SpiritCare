import { Gender, Status } from "@prisma/client";
import { z } from "zod";

export const createPersonFormSchema = z.object({
  firstname: z.string({ required_error: "Le prénom est requis" }),
  lastname: z.string({ required_error: "Le nom est requis" }),
  email: z.string({
    required_error: "L'email est requis",
    invalid_type_error: "L'email est invalide",
  }),
  phone: z.string({
    required_error: "Le téléphone est requis",
    invalid_type_error: "Le téléphone est invalide",
  }),
  dateOfBirth: z.date({
    required_error: "La date de naissance est requise",
    invalid_type_error: "La date de naissance est invalide",
  }),
  gender: z.nativeEnum(Gender),
  status: z.nativeEnum(Status),
});
