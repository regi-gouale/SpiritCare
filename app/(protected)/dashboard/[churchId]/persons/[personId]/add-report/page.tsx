import { auth } from "@/auth";
import { AddReport } from "@/components/reports/add-report";
import { redirect } from "next/navigation";

type AddReportPageProps = Promise<{ personId: string }>;

export default async function AddReportPage(props: {
  params: AddReportPageProps;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { personId } = await props.params;

  if (!personId) {
    return <div>Loading</div>;
  }
  return (
    <div className="h-full">
      <main>
        <AddReport
          personId={personId}
          userId={session.user.id}
          churchId={session.user.churchId}
        />
      </main>
    </div>
  );
}
