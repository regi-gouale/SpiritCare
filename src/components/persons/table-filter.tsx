import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Person } from "@prisma/client";
import { Table as ReactTable } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

export const PersonsTableFilter = ({
  table,
}: {
  table: ReactTable<Person>;
}) => (
  <div className="flex items-center justify-between font-lato">
    <Input
      placeholder="Rechercher une personne"
      value={(table.getColumn("Nom")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("Nom")?.setFilterValue(event.target.value)
      }
      className="mr-4 max-w-md rounded-full"
    />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="ml-auto rounded-full border">
          Colonnes <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="font-lato"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
