import { getPersonsAction } from "@/actions/get-persons-action";
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
        <h1 className="text-center text-3xl font-bold">Persons</h1>
        <PersonsTable persons={persons} />
      </main>
    </div>
  );
}
