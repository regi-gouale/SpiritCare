"use client";

import { createReport } from "@/actions/actions";
import { Tiptap } from "@/components/tiptap";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createReportFormSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../ui/input";

export type AddReportFormProps = {
  personId: string;
  userId: string;
};

export const AddReportForm = ({ personId, userId }: AddReportFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof createReportFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(createReportFormSchema),
    defaultValues: {
      personId,
      userId,
      date: new Date(),
      reason: ``,
      content: ``,
    },
  });
  // const { data: session } = useSession();

  // if (!session) {
  //   return null;
  // }

  async function onSubmit(data: z.infer<typeof createReportFormSchema>) {
    const result = createReportFormSchema.safeParse(data);

    // console.log(result);

    if (!result.success) {
      toast.error("Veuillez remplir correctement le formulaire");
      return;
    }

    const response = await createReport(data);

    // console.log(response);

    if (response.ok) {
      toast.success(`Rapport du ${response.data.date} ajouté avec succès`);

      form.reset();
      // if (!session?.user.churchId) {
      //   router.push("/dashboard");
      // }
      // router.push(`dashboard/${session?.user.churchId}/persons/${personId}`);
      router.back();
    } else toast.error(response.error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-4xl space-y-8"
      >
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-2 items-center">
                <FormLabel className="font-lato text-xl font-semibold">
                  Date de l'entretien
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "text-left font-normal font-epilogue rounded-xl",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2023-01-01")
                      }
                      captionLayout="dropdown"
                      fromYear={2020}
                      toYear={new Date().getFullYear()}
                      defaultMonth={field.value || new Date()}
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-lato text-xl font-semibold">
                  Raison de l'entretien
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full rounded-2xl border border-input p-2 font-epilogue text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-primary"
                    placeholder="Raison"
                  />
                </FormControl>
                <FormDescription className="text-muted-foreground">
                  Écrire la raison de l'entretien, le contexte, les
                  circonstances.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-lato text-xl font-semibold">
                  Rapport
                </FormLabel>
                <FormControl>
                  <div>
                    <Tiptap
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-muted-foreground">
                  Écrire le rapport de l'entretien, les observations, les notes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 space-x-4">
          <Button
            variant={"destructive"}
            className="rounded-xl"
            onClick={() => {
              router.push(`/persons/${personId}`);
            }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="rounded-xl"
            onClick={() => {
              toast.info(`${JSON.stringify(form.getValues())}`);
            }}
          >
            Ajouter le rapport
          </Button>
        </div>
      </form>
    </Form>
  );
};
