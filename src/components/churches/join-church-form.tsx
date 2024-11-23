"use client";

import { joinChurch } from "@/actions/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { joinChurchFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface JointChurchFormProps {
  userId: string;
}

export const JoinChurchForm = ({ userId }: JointChurchFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof joinChurchFormSchema>>({
    resolver: zodResolver(joinChurchFormSchema),
    defaultValues: {
      joinCode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof joinChurchFormSchema>) {
    const result = joinChurchFormSchema.safeParse(data);

    if (!result.success) {
      toast.error("Veuillez remplir correctement le formulaire");
      return;
    }

    const response = await joinChurch(data, userId);

    if (response.ok) {
      toast.success("Vous avez rejoint l'église avec succès");

      form.reset();
      router.push(`/dashboard/${response.data.id}`);
    } else
      toast.error("Une erreur est survenue lors de la création de l'église");
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
                    <FormLabel>Code pour réjoindre l'église</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Insérer le code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2">
                <div></div>
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
