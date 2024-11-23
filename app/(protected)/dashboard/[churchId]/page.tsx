import { auth } from "@/auth";
import { ReportWithMember } from "@/components/dashboard/columns";
import { RecentReportsDataTable } from "@/components/dashboard/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Person, Report } from "@prisma/client";
import { redirect } from "next/navigation";

async function getNumberOfMembers(churchId: string) {
  const members = await prisma.person.findMany({
    where: {
      churchId: churchId,
    },
  });
  return members.length;
}

async function getNumberOfMembersCreatedThisMonth(churchId: string) {
  const members = await prisma.person.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
      churchId: churchId,
    },
  });
  return members.length;
}

async function getNumberOfReports() {
  const reports = await prisma.report.findMany();
  return reports.length;
}

async function getRecentReports(userId: string): Promise<ReportWithMember[]> {
  const reportsWithMembers: ReportWithMember[] = [];

  const reports = (await prisma.report.findMany({
    where: {
      userId,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  })) as unknown as Report[];

  // get member name of report
  for (let i = 0; i < reports.length; i++) {
    const member = (await prisma.person.findUnique({
      where: {
        id: reports[i].personId,
      },
    })) as Person;
    reportsWithMembers.push({
      index: i,
      report: reports[i],
      member,
    });
  }

  return reportsWithMembers;
}

async function getNumberOfMyReports(userId: string, churchId: string) {
  const reports = await prisma.report.findMany({
    where: {
      userId,
      churchId,
    },
  });
  return reports.length;
}

type ChurchIdDashboardProps = Promise<{
  churchId: string;
}>;

export default async function ChurchIdDashboard(props: {
  params: ChurchIdDashboardProps;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { churchId } = await props.params;

  if (!churchId) {
    return <div>Loading</div>;
  }

  const recentReports = await getRecentReports(session.user.id);

  return (
    <div className="flex min-h-screen w-full flex-col" suppressHydrationWarning>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium">Membres de l'église</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
              <div className="text-2xl font-bold">
                {getNumberOfMembers(churchId)}
              </div>
              <div className="text-sm text-muted-foreground">
                Dont {getNumberOfMembersCreatedThisMonth(churchId)} ce mois
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rapports d'entretiens
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
              <div className="text-2xl font-bold">{getNumberOfReports()}</div>
              <div className="text-sm text-muted-foreground">
                Mes rapports : {getNumberOfMyReports(session.user.id, churchId)}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="ml-4 text-xl font-medium">
              Mes derniers rapports
            </CardTitle>
            <div>
              <div className="flex size-8 items-center justify-center rounded-md">
                <span className="sr-only">Toggle menu</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="mx-auto max-w-4xl space-y-4 p-4">
              <RecentReportsDataTable reports={recentReports} />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
