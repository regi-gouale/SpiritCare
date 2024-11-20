// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const session = await auth();

//   if (!session) {
//     redirect("/login");
//   }

//   return <div>Dashboard</div>;
// }

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZlIwddoRXUX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// "use client";
import { auth } from "@/auth";
import { ReportWithMember } from "@/components/dashboard/columns";
import { RecentReportsDataTable } from "@/components/dashboard/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Person, Report } from "@prisma/client";
import { redirect } from "next/navigation";
// import { ResponsiveBar } from "@nivo/bar";
// import { ResponsiveLine } from "@nivo/line";

async function getNumberOfMembers() {
  const members = await prisma.person.findMany();
  return members.length;
}

async function getNumberOfMembersCreatedThisMonth() {
  const members = await prisma.person.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
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
      date: "desc",
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

async function getNumberOfMyReports(userId: string) {
  const reports = await prisma.report.findMany({
    where: {
      userId,
    },
  });
  return reports.length;
}

export default async function Component() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  if (!session.user.id) {
    return <div>Loading</div>;
  }

  const recentReports = await getRecentReports(session.user.id);

  return (
    <div className="flex flex-col w-full min-h-screen" suppressHydrationWarning>
      {/* <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <Package2Icon className="w-6 h-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link href="#" className="font-bold" prefetch={false}>
            Orders
          </Link>
          <Link
            href="#"
            className="text-gray-500 dark:text-gray-400"
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-gray-500 dark:text-gray-400"
            prefetch={false}
          >
            Analytics
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src="/placeholder.svg"
              width="32"
              height="32"
              className="rounded-full"
              alt="Avatar"
              style={{ aspectRatio: "32/32", objectFit: "cover" }}
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header> */}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="font-medium">Membres de l'église</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start flex-col">
              <div className="text-2xl font-bold">{getNumberOfMembers()}</div>
              <div className="text-sm text-muted-foreground">
                Dont {getNumberOfMembersCreatedThisMonth()} ce mois
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Rapports d'entretiens
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-start flex-col">
              <div className="text-2xl font-bold">{getNumberOfReports()}</div>
              <div className="text-muted-foreground text-sm">
                Mes rapports : {getNumberOfMyReports(session.user.id)}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl font-medium">
              Mes derniers rapports
            </CardTitle>
            <div>
              <div className="rounded-md w-8 h-8 flex items-center justify-center">
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
