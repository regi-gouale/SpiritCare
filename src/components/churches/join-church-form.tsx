"use client";

import { joinChurch } from "@/actions/actions";
import { Button } from "@/components/ui/button";
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
import { joinChurchFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const JoinChurchForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof joinChurchFormSchema>>({
    resolver: zodResolver(joinChurchFormSchema),
    defaultValues: {
      joinCode: "",
    },
  });

  if (!session) return null;

  async function onSubmit(data: z.infer<typeof joinChurchFormSchema>) {
    const result = joinChurchFormSchema.safeParse(data);

    if (!result.success) {
      toast.error("Veuillez remplir correctement le formulaire");
      return;
    }

    const response = await joinChurch(data, session!.user.id);

    if (response.ok) {
      toast.success("Vous avez rejoint l'église avec succès");

      form.reset();
      router.push(`/dashboard/${response.data.id}`);
    } else
      toast.error(
        response.error || "Une erreur est survenue lors de l'opération"
      );
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Rejoindre une église
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col space-y-8 p-4">
              <FormField
                control={form.control}
                name="joinCode"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col justify-center space-y-4">
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insérer le code pour réjoindre l'église"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 space-x-4">
                <Button
                  variant={"secondary"}
                  className="font-lato font-semibold"
                  onClick={() => router.back()}
                  disabled={form.formState.isSubmitting}
                >
                  Annuler
                </Button>
                <Button type="submit" className="font-lato font-semibold">
                  Réjoindre l'église
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
