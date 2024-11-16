type PersonIdPageProps = Promise<{
  personId: string;
  reportId: string;
}>;

export default async function PersonIdReportIdPage(props: {
  params: PersonIdPageProps;
}) {
  const { personId, reportId } = await props.params;
  return (
    <div>
      <h1>PersonIdReportIdPage</h1>
      <div>{personId}</div>
      <div>{reportId}</div>
    </div>
  );
}
