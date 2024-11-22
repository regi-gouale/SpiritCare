import { auth } from "@/auth";
import { Tiptap } from "@/components/tiptap";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  return (
    <div className="h-full">
      <main className="m-4">
        <div className="mx-auto my-10 flex max-w-4xl items-center justify-between p-4">
          <Link href={`/persons/${personId}`}>
            <ArrowLeftIcon className="size-8 cursor-pointer" />
          </Link>
          <h1 className="text-center font-lato text-xl font-black lg:text-2xl xl:text-3xl">
            Entretien de {person.firstname}{" "}
            {person.lastname.toLocaleUpperCase()}
          </h1>
          <div></div>
        </div>
        <Card className="mx-auto my-10 max-w-4xl items-center justify-between p-4">
          <CardHeader>
            <div className="flex items-center justify-evenly">
              <span className="font-lato text-xl font-semibold">
                Date de l'entretien :{" "}
              </span>
              <span className="ml-10 font-lato text-xl">
                {format(new Date(report.date), "PPP", { locale: fr })}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-evenly gap-4">
              <span className="font-lato text-xl font-semibold">
                Notes de l'entretien :{" "}
              </span>
              <span className="w-full text-justify font-epilogue text-base">
                {/* {report.content} */}
                <Tiptap description={report.content} />
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
