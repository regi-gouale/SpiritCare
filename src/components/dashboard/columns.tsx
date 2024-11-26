import { Person, Report } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export type ReportWithMember = {
  index: number;
  report?: Report;
  member?: Person;
};

export interface RecentReport {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  personId: string;
  content: string;
  date: Date;
  userId: string;
  body?: string;
  type?: string;
  url?: string;
  toJSON?: () => string;
}

export const recentReportsColumns: ColumnDef<ReportWithMember>[] = [
  {
    id: "index",
    accessorKey: "index",
    header: () => (
      <div className="ml-4 font-lato text-sm font-semibold">N°</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-4 truncate text-left font-epilogue text-sm">
          {row.original.index + 1}
        </div>
      );
    },
  },
  {
    id: "date",
    // accessorKey: "date",
    header: () => (
      <div className="font-lato text-sm font-semibold">Date de l'entretien</div>
    ),
    cell: ({ row }) => {
      const report = row.original.report;

      return (
        <div className="truncate text-left font-epilogue text-sm">
          {format(report?.date as Date, "PPP", { locale: fr })}
        </div>
      );
    },
  },
  {
    id: "Membre",
    // accessorKey: "personId",
    header: () => <div className="font-lato text-sm font-semibold">Avec</div>,
    cell: ({ row }) => {
      const member = row.original.member;
      return (
        <div className="truncate text-left font-epilogue text-sm">
          {member?.firstname} {member?.lastname.toLocaleUpperCase()}
        </div>
      );
    },
  },
];
