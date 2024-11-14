"use client";

import { createPersonAction } from "@/actions/person-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPersonFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "../ui/phone-input";

export const AddPersonForm = () => {
  const form = useForm<z.infer<typeof createPersonFormSchema>>({
    resolver: zodResolver(createPersonFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      dateOfBirth: new Date("2000-01-01"),
      gender: "MALE",
      status: "MEMBER",
    },
  });

  return (
    <Form {...form}>
      <form action={createPersonAction} className="space-y-4">
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
                    className="rounded-full"
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
                  <Input
                    placeholder="Nom"
                    {...field}
                    className="rounded-full"
                  />
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
                <Input
                  placeholder="E-mail"
                  {...field}
                  className="rounded-full"
                />
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
              {/* <FormLabel>Nom</FormLabel> */}
              <FormControl>
                <PhoneInput
                  placeholder="Téléphone"
                  {...field}
                  className="rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 space-x-4">
          <div></div>
          <Button type="submit" className="rounded-full">
            Ajouter
          </Button>
        </div>
      </form>
    </Form>
  );
};
