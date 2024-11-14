import { getPersonsAction } from "@/actions/get-persons-action";
import { AddPersonButton } from "@/components/persons/add-person-button";
import { PersonsTable } from "@/components/persons/table";
import { Person } from "@prisma/client";

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
          <AddPersonButton />
        </div>
        <PersonsTable persons={persons} />
      </main>
    </div>
  );
}
