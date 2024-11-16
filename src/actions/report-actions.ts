"user server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { createReportFormSchema } from "@/lib/schema";
import { Report } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createReportAction(
  data: z.infer<typeof createReportFormSchema>
) {
  try {
    const reportCreated = await prisma.report.create({
      data: data,
    });

    revalidatePath(`/persons/${data.personId}`);
    return {
      ok: true,
      error: null,
      data: JSON.parse(JSON.stringify(reportCreated)) as Report,
    };
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la création du rapport",
      error
    );
    return {
      ok: false,
      error: "Une erreur est survenue lors de la création du rapport",
      data: null,
    };
  }
}
