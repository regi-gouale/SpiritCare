import { getPersonsAction } from "@/actions/get-persons-action";
import { PersonsTable } from "@/components/persons/table";
import { Person } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const persons: Person[] | Error = await getPersonsAction();

  if (persons instanceof Error) {
    return <div>{persons.message}</div>;
  }

  return (
    <div className="h-full">
      <main>
        <div className="mx-auto my-10 flex max-w-4xl items-center justify-between p-4">
          <h1 className="text-center font-lato text-4xl font-black">
            Liste des membres
          </h1>
          <Link
            href={"/add-member"}
            className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-primary px-4 py-2 font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <span className="font-lato">Ajouter</span>
            <PlusIcon className="size-4 text-primary-foreground" />
          </Link>
        </div>
        <PersonsTable persons={persons} />
      </main>
    </div>
  );
}
