import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Person } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNowStrict } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { formatPhoneNumber } from "react-phone-number-input";

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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const person = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `${person.firstname} ${person.lastname}`
                )
              }
            >
              Copier le nom
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/persons/${person.id}/add-report`}
                className="block w-full"
              >
                Ajouter un rapport
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/persons/${person.id}/edit`}
                className="block w-full"
              >
                Modifier les informations
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
