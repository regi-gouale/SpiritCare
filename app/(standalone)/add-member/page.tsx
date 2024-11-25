import { AddPersonForm } from "@/components/persons/add-person-form";
import { SessionProvider } from "next-auth/react";

export default function AddMemberPage() {
  return (
    <div className="m-auto flex size-full flex-col items-center justify-center space-y-8 py-10">
      <h1 className="text-2xl font-bold">Ajouter un membre</h1>
      <SessionProvider>
        <AddPersonForm />
      </SessionProvider>
    </div>
  );
}
