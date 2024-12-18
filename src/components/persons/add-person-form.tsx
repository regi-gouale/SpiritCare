"use client";

import { createPerson } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPersonFormSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, Status } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AddPersonForm = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const form = useForm<z.infer<typeof createPersonFormSchema>>({
    resolver: zodResolver(createPersonFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      fullname: "",
      email: "",
      phone: "",
      dateOfBirth: new Date("2000-01-01"),
      gender: Gender.MALE,
      status: Status.MEMBER,
      churchId: "",
    },
  });

  if (!session) return null;

  async function onSubmit(data: z.infer<typeof createPersonFormSchema>) {
    const churchId = session?.user.churchId;
    if (!churchId) {
      toast.error("Vous devez rejoindre une église pour ajouter un membre");
      router.push("/churches/join");
    }
    data.churchId = churchId!;
    const result = createPersonFormSchema.safeParse(data);

    if (!result.success) {
      toast.error("Veuillez remplir correctement le formulaire");
      return;
    }
    const response = await createPerson(data);
    if (response.ok) {
      toast.success(
        `${data.firstname} ${data.lastname} a été ajouté avec succès`
      );

      form.reset();
      router.back();
    } else toast.error(response.error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // action={form.handleSubmit(createPerson)}
        className="w-full max-w-4xl space-y-4"
      >
        <div className="grid w-full grid-cols-2 items-center justify-between space-x-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Prénom</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Prénom"
                    {...field}
                    className="rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Nom</FormLabel> */}
                <FormControl>
                  <Input placeholder="Nom" {...field} className="rounded-xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Nom</FormLabel> */}
              <FormControl>
                <Input placeholder="E-mail" {...field} className="rounded-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  placeholder="+33 6 12 34 57 89"
                  {...field}
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex w-full grid-cols-5 items-center justify-between space-x-4">
              <FormLabel className="col-span-2 w-auto font-lato text-sm">
                Date de naissance :
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal font-epilogue rounded-xl col-span-3",
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
                      date > new Date() || date < new Date("1920-01-01")
                    }
                    captionLayout={"dropdown"}
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    defaultMonth={field.value || new Date()}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 space-x-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Choisir un sexe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Gender.MALE}>Homme</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Femme</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Choisir un sexe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Status.MEMBER}>Membre</SelectItem>
                    <SelectItem value={Status.AIDE}>AIDE</SelectItem>
                    <SelectItem value={Status.STAR}>STAR</SelectItem>
                    <SelectItem value={Status.RESPONSABLE}>
                      Responsable de département
                    </SelectItem>
                    <SelectItem value={Status.MINISTRE}>
                      Responsable de ministère
                    </SelectItem>
                    <SelectItem value={Status.ASSISTANT_PASTEUR}>
                      Assistant Pasteur
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 space-x-4">
          <div></div>
          <Button type="submit" className="rounded-xl">
            Ajouter
          </Button>
        </div>
      </form>
    </Form>
  );
};
