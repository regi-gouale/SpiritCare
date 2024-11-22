"use client";

import { AddReportForm } from "@/components/reports/add-report-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type AddReportProps = {
  personId: string;
  userId: string;
};

export const AddReport = ({ personId, userId }: AddReportProps) => {
  return (
    <Card className="mx-4 my-16 flex max-w-4xl flex-1 flex-col items-center justify-center rounded-xl p-10 sm:mx-8 lg:mx-auto">
      <CardHeader className="mb-10">
        <CardTitle className="font-lato text-2xl">Ajouter un rapport</CardTitle>
      </CardHeader>

      <AddReportForm personId={personId} userId={userId} />
    </Card>
  );
};
