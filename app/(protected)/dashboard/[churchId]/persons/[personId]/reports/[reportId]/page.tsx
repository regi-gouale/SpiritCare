import { auth } from "@/auth";
import { Tiptap } from "@/components/tiptap";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type PersonIdPageProps = Promise<{
  personId: string;
  reportId: string;
}>;

export default async function PersonIdReportIdPage(props: {
  params: PersonIdPageProps;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { personId, reportId } = await props.params;
  const person = await prisma.person.findUnique({
    where: {
      id: personId,
    },
  });
  if (!person) {
    return <div>Aucune personne trouvée.</div>;
  }
  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
  });

  if (!report) {
    return <div>Aucun rapport pour cette personne.</div>;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: report.userId,
    },
  });

  if (!user) {
    return <div>Utilisateur non trouvé.</div>;
  }

  return (
    <div className="h-full">
      <main className="m-4">
        <div className="mx-auto my-10 flex max-w-4xl items-center justify-between p-4">
          <Link href={`/dashboard/${user.churchId}/persons/${personId}`}>
            <ArrowLeftIcon className="size-8 cursor-pointer" />
          </Link>
          <h1 className="text-center font-lato text-xl font-black lg:text-2xl xl:text-3xl">
            Rendez-vous de {person.firstname}{" "}
            {person.lastname.toLocaleUpperCase()}
          </h1>
          <div></div>
        </div>
        <Card className="mx-auto my-10 max-w-4xl items-center justify-between p-4">
          <CardHeader>
            <div className="flex flex-col items-center justify-around">
              <div>
                <span className="font-lato font-semibold">
                  Date de l'entretien :{" "}
                </span>
                <span className="ml-10 font-lato">
                  {format(new Date(report.date), "PPP", { locale: fr })}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-evenly gap-4">
              <span className="font-lato text-xl font-semibold">
                {report.reason}
              </span>
              <span className="w-full text-justify font-epilogue text-base">
                {/* {report.content} */}
                <Tiptap description={report.content} />
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm">
              <span className="font-lato font-semibold">
                Rendez-vous réalisé par :{" "}
              </span>
              <span className="ml-10 font-lato">
                {user.firstname} {user.lastname?.toLocaleUpperCase()}
              </span>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
