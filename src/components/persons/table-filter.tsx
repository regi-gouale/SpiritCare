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
  <div className="flex items-center">
    <Input placeholder="Filter emails" />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem key={column.id}>
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
