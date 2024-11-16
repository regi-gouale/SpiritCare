import { AddReportForm } from "@/components/reports/add-report-form";

type PersonIdAddReportPageProps = Promise<{
  personId: string;
}>;

export default async function PersonIdAddReportPage(props: {
  params: PersonIdAddReportPageProps;
}) {
  const { personId } = await props.params;

  if (!personId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <main>
        <div className="mx-auto my-10 flex w-full flex-col items-center justify-between space-y-8 p-10">
          <h1 className="text-center font-lato text-4xl font-black">
            Ajouter un rapport d'entretien
          </h1>
          <h2>{personId}</h2>
          <AddReportForm personId={personId} />
        </div>
      </main>
    </div>
  );
}
