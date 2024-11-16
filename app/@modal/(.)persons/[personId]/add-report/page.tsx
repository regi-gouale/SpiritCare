"use client";

import { Modal } from "@/components/modal";
import { AddReportForm } from "@/components/reports/add-report-form";

type AddReportPageProps = { personId: string };
export const AddReportPage = ({ personId }: AddReportPageProps) => {
  return (
    <Modal
      title="Ajouter un rapport"
      description="Remplir toutes les informations pour ajouter un rapport"
    >
      <AddReportForm personId={personId} />
      <div>{personId}</div>
    </Modal>
  );
};
