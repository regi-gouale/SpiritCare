"use client";

import { AddReportForm } from "@/components/reports/add-report-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { use } from "react";

type AddReportPageProps = Promise<{ personId: string }>;

export default function AddReportPage(props: { params: AddReportPageProps }) {
  const params = use(props.params);
  const personId = params.personId;

  return (
    <Card className="mx-4 sm:mx-8 lg:mx-auto flex flex-1 items-center justify-center max-w-4xl my-16 p-10 flex-col rounded-xl">
      <CardHeader className="mb-10">
        <CardTitle className="text-2xl font-lato">Ajouter un rapport</CardTitle>
      </CardHeader>

      <AddReportForm personId={personId} />
    </Card>
  );
}
