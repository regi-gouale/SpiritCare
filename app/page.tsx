import { getPersonsAction } from "@/actions/get-persons-action";
import { PersonsTable } from "@/components/persons/table";
import { Person } from "@prisma/client";
import { Link, PlusIcon } from "lucide-react";

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
            href="/add-member"
            className="flex space-x-2 rounded-full border bg-primary/90 px-4 py-1.5 text-primary-foreground"
          >
            <span className="font-lato">Ajouter</span>
            <PlusIcon className="size-6" />
          </Link>
          {/* <AddPersonButton /> */}
        </div>
        <PersonsTable persons={persons} />
      </main>
    </div>
  );
}
