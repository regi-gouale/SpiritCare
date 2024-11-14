"use client";

import { PersonsTableFilter } from "@/components/persons/table-filter";
import { PersonsTablePagination } from "@/components/persons/table-pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPhoneNumber } from "@/lib/utils";
import { Person } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { formatDistanceToNowStrict } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown, MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

export const personsTableColumns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
        className="mr-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select this row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "Nom",
    accessorKey: "fullname",
    header: ({ column }) => (
      <div className="flex items-center justify-start">
        <span className="font-lato text-sm font-semibold">Nom</span>
        <Button
          className="ml-0"
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: (row) => (
      <div className="text-left font-epilogue text-sm">
        {row.getValue() as string}
      </div>
    ),
  },
  {
    id: "E-mail",
    accessorKey: "email",
    header: () => <div className="font-lato text-sm font-semibold">E-mail</div>,
    cell: (row) => (
      <div className="truncate text-left font-epilogue text-sm">
        {row.getValue() as string}
      </div>
    ),
  },
  {
    id: "Téléphone",
    accessorKey: "phone",
    header: () => (
      <div className="font-lato text-sm font-semibold">Téléphone</div>
    ),
    cell: (row) => {
      return (
        <div className="text-left font-epilogue text-sm">
          {formatPhoneNumber(row.getValue() as string)}
        </div>
      );
    },
  },
  {
    id: "Statut",
    accessorKey: "status",
    header: () => <div className="font-lato text-sm font-semibold">Statut</div>,
    cell: (row) => (
      <div className="truncate text-left font-epilogue text-sm">
        {row.getValue() as string}
      </div>
    ),
  },
  {
    id: "Age",
    header: () => <div className="font-lato text-sm font-semibold">Age</div>,
    cell: ({ row }) => {
      const person = row.original;
      const age = formatDistanceToNowStrict(person.dateOfBirth, {
        locale: fr,
      });
      // const age = 20;

      return <div className="font-epilogue text-sm">{age}</div>;
    },
  },
  {
    id: "action",
    header: () => (
      <div className="mr-2 text-right font-lato text-sm font-semibold">
        Actions
      </div>
    ),
    cell: () => (
      <Button
        variant={"ghost"}
        className="flex w-full justify-end p-0"
        size={"icon"}
      >
        <MoreHorizontalIcon className="mr-2 size-4" />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export type PersonsTableProps = {
  persons: Person[];
};

export const PersonsTable = ({ persons }: PersonsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: persons,
    columns: personsTableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <PersonsTableFilter table={table} />

      <div className="rounded-xl border">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={index % 2 === 0 ? "bg-primary/5" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={personsTableColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PersonsTablePagination table={table} />
    </div>
  );
};
