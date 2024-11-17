import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type PersonIdEditPageProps = Promise<{
  personId: string;
}>;

export default async function PersonIdAddReportPage(props: {
  params: PersonIdEditPageProps;
}) {
  const { personId } = await props.params;

  if (!personId) {
    return <div>Loading</div>;
  }

  const person = await prisma.person.findUnique({
    where: {
      id: personId,
    },
  });

  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div className="h-full">
      <main>
        <div className="mx-auto my-10 flex w-full flex-col items-center justify-between space-y-8 p-10">
          <div className="flex w-full max-w-3xl items-center justify-between">
            <Link href={`/persons/${personId}`}>
              <ArrowLeftIcon className="size-8 cursor-pointer" />
            </Link>
            <h1 className="text-center font-lato text-4xl font-black">
              {`${person.firstname} ${person.lastname.toLocaleUpperCase()}`}
            </h1>
            <div></div>
          </div>
          <Card className="w-full max-w-3xl rounded-3xl">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Modifier les informations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="w-full"
                    defaultValue={person.firstname}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastname">Nom</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="w-full"
                    defaultValue={person.lastname}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full"
                    defaultValue={person.email}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full"
                    defaultValue={person.phone}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dateOfBirth">Date de naissance</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="w-full"
                    defaultValue={person.dateOfBirth.toDateString()}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
