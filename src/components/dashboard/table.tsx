"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { recentReportsColumns, ReportWithMember } from "./columns";

export const RecentReportsDataTable = ({
  reports,
}: {
  reports: ReportWithMember[];
}) => {
  const table = useReactTable({
    data: reports,
    columns: recentReportsColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {},
  });

  return (
    <div className="border rounded-xl">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={index % 2 === 0 ? "bg-primary/5" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} onClick={() => {}}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={recentReportsColumns.length}
                className="h-24 text-center"
              >
                Aucun résultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
