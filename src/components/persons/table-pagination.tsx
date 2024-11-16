import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Person } from "@prisma/client";
// import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Table as ReactTable } from "@tanstack/react-table";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

export const PersonsTablePagination = ({
  table,
}: {
  table: ReactTable<Person>;
}) => (
  <div className="mx-auto flex items-center justify-between space-x-2 py-4 font-epilogue text-sm text-muted-foreground">
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Lignes par page</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center text-sm">
        Page {table.getState().pagination.pageIndex + 1} sur{" "}
        {table.getPageCount()}
      </div>
      <div className="ml-auto flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden rounded-full p-0 lg:flex"
          size={"icon"}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronFirstIcon className="size-4" />
          {/* <DoubleArrowLeftIcon className="size-4" /> */}
        </Button>
        <Button
          variant="outline"
          className="rounded-full p-0"
          size={"icon"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          className="rounded-full p-0"
          size={"icon"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden rounded-full p-0 lg:flex"
          size={"icon"}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronLastIcon className="size-4" />
          {/* <DoubleArrowRightIcon className="size-4" /> */}
        </Button>
      </div>
    </div>
  </div>
);
