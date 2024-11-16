"use client";

// import { createReportAction } from "@/actions/report-actions";
import { createReport } from "@/actions/actions";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

export type AddReportFormProps = {
  // children: ReactNode;
  personId: string;
};

export const AddReportForm = ({ personId }: AddReportFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof createReportFormSchema>>({
    resolver: zodResolver(createReportFormSchema),
    defaultValues: {
      personId,
      date: new Date(),
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createReportFormSchema>) {
    const result = createReportFormSchema.safeParse(data);

    if (!result.success) {
      toast.error("Veuillez remplir correctement le formulaire");
      return;
    }

    const response = await createReport(data);

    if (response.ok) {
      toast.success(`Rapport du ${response.data.date} ajouté avec succès`);

      form.reset();
      router.push(`/persons/${personId}`);
    } else toast.error(response.error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-4xl space-y-4"
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
                          "text-left font-normal font-epilogue rounded-full",
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-lato text-xl font-semibold">
                  Rapport
                </FormLabel>
                <FormControl>
                  <div>
                    {/* <MinimalTiptapEditor
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      output="text"
                      placeholder="Saisir le rapport de l'entretien ici..."
                      autofocus={true}
                      editable={true}
                      editorContentClassName="overflow-auto min-h-72 max-h-72"
                      editorClassName="p-2 min-h-72"
                      immediatelyRender={false}
                    /> */}
                    <Textarea
                      {...field}
                      className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Saisir le rapport de l'entretien ici..."
                      rows={16}
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-muted-foreground">
                  Écrire le rapport de l'entretien, les observations, les notes.
                </FormDescription>
                {/* <div>{field.value}</div> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 space-x-4">
          <Button
            variant={"destructive"}
            className="rounded-full"
            onClick={() => {
              router.push("/");
            }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="rounded-full"
            // onClick={() => {
            //   console.log("submit");
            //   onFormSubmit(form.getValues());
            // }}
          >
            Ajouter le rapport
          </Button>
        </div>
      </form>
    </Form>
  );
};
