import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeftIcon, Eye, PenIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

type PersonIdPageProps = Promise<{
  personId: string;
}>;

export default async function PersonIdPage(props: {
  params: PersonIdPageProps;
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

  const reports = await prisma.report.findMany({
    where: {
      personId: personId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="h-full">
      <main>
        <div className="mx-auto my-10 flex w-full flex-col items-center justify-between space-y-8 p-10">
          <div className="flex w-full max-w-3xl items-center justify-between">
            <Link href="/persons">
              <ArrowLeftIcon className="size-8 cursor-pointer" />
            </Link>
            <h1 className="text-center font-lato text-xl font-black md:text-2xl lg:text-3xl xl:text-4xl">
              {`${person.firstname} ${person.lastname.toLocaleUpperCase()}`}
            </h1>
            <Link href={`/persons/${personId}/add-report`}>
              <Button
                variant="default"
                className="rounded-full font-lato font-semibold"
              >
                <PlusIcon className="size-4" />
                Rapport
              </Button>
            </Link>
          </div>
          <Card className="w-full max-w-3xl rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-xl">Informations</span>
                <Link href={`/persons/${personId}/edit`}>
                  <Button
                    variant="secondary"
                    className="cursor-pointer rounded-full"
                  >
                    <PenIcon className="size-3" />
                    <span className="font-lato font-semibold">Modifier</span>
                  </Button>
                </Link>
              </CardTitle>
              <CardDescription>
                Liste des informations du membre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2">
                  <span className="font-lato text-sm font-semibold">
                    Nom complet
                  </span>
                  <span className="font-epilogue text-sm">
                    {`${person.firstname} ${person.lastname}`}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-lato text-sm font-semibold">
                    Date de naissance
                  </span>
                  <span className="font-epilogue text-sm">
                    {format(new Date(person.dateOfBirth), "PPP", {
                      locale: fr,
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="font-lato text-sm font-semibold">
                    Téléphone
                  </span>
                  <span className="font-epilogue text-sm">{person.phone}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-lato text-sm font-semibold">Email</span>
                  <span className="font-epilogue text-sm">{person.email}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-lato text-sm font-semibold">Sexe</span>
                  <span className="font-epilogue text-sm">
                    {person.gender === Gender.MALE ? "Homme" : "Femme"}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-lato text-sm font-semibold">
                    Statut
                  </span>
                  <span className="font-epilogue text-sm">{person.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className={"flex w-full flex-col items-center gap-4"}>
            {reports.length === 0 ? (
              <div>Aucun rapport.</div>
            ) : (
              reports.map((report) => (
                <Card key={report.id} className="w-full max-w-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Entretien du{" "}
                      {format(new Date(report.date), "PPP", { locale: fr })}
                      <div className="flex space-x-2">
                        <Link
                          href={`/persons/${personId}/reports/${report.id}`}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                          >
                            <Eye className="size-4 cursor-pointer" />
                          </Button>
                        </Link>
                        {/* <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <TrashIcon className="size-4 cursor-pointer" />
                        </Button> */}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex">
                        <span className="truncate font-epilogue text-sm">
                          {report.content}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
