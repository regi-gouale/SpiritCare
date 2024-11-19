"use client";
import { Gender, Status } from "@prisma/client";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const createPersonFormSchema = z.object({
  firstname: z.string({ required_error: "Le prénom est requis" }).min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }),
  lastname: z.string({ required_error: "Le nom est requis" }).min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  fullname: z.string().optional(),
  email: z
    .string({
      required_error: "L'email est requis",
      invalid_type_error: "L'email est invalide",
    })
    .email({ message: "L'email est invalide" }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, {
      message: "Le téléphone est invalide",
    })
    .or(z.literal("")),
  dateOfBirth: z.date({
    required_error: "La date de naissance est requise",
    invalid_type_error: "La date de naissance est invalide",
  }),
  gender: z.nativeEnum(Gender),
  status: z.nativeEnum(Status),
});

export const createReportFormSchema = z.object({
  personId: z.string(),
  userId: z.string(),
  date: z.date({
    required_error: "La date est requise",
    invalid_type_error: "La date est invalide",
  }),
  content: z
    .string({
      required_error: "Le contenu est requis",
      message: "Le contenu doit contenir au moins 10 caractères",
    })
    .min(10, "Le contenu doit contenir au moins 10 caractères"),
});
