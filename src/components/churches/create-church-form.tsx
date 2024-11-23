"use client";

import { createChurch } from "@/actions/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createChurchFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";

interface CreateChurchFormProps {
  onCancel?: () => void;
  userId: string;
}

export const CreateChurchForm = ({
  onCancel,
  userId,
}: CreateChurchFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof createChurchFormSchema>>({
    resolver: zodResolver(createChurchFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      country: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createChurchFormSchema>) {
    const result = createChurchFormSchema.safeParse(data);

    if (!result.success) {
      toast.error("Veuillez remplir correctement le formulaire");
      return;
    }

    const response = await createChurch(data, userId);

    if (response.ok) {
      toast.success("L'église a été créée avec succès");

      form.reset();
      router.push("/dashboard");
    } else
      toast.error("Une erreur est survenue lors de la création de l'église");
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-center font-lato text-xl">
          Créer une église
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 lg:mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <div className="flex w-full flex-col items-center justify-between space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center justify-center">
                    <FormLabel className="w-52 text-sm">
                      Nom de l'église :
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Campus de Lyon" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center justify-center">
                    <FormLabel className="w-52 text-sm">Adresse :</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Adresse de l'église" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center justify-center">
                    <FormLabel className="w-52 text-sm">Ville :</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ville de l'église" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center justify-center">
                    <FormLabel className="w-52 text-sm">Pays :</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Pays de l'église" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 space-x-4 pt-8">
              <Button
                variant={"destructive"}
                className="font-lato font-semibold"
                onClick={() => {
                  if (onCancel) {
                    onCancel();
                  } else {
                    router.push("/");
                  }
                }}
              >
                Annuler
              </Button>
              <Button type="submit" className="font-lato font-semibold">
                Créer une église
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
