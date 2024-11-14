import { Button } from "@/components/ui/button";
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
  <div className="mx-auto flex items-center justify-end space-x-2 py-4 font-epilogue text-sm text-muted-foreground">
    <div className="flex-1">
      {table.getFilteredSelectedRowModel().rows.length} sur{" "}
      {table.getFilteredRowModel().rows.length} ligne
      {table.getFilteredSelectedRowModel().rows.length > 1 ? "s" : ""}{" "}
      sélectionnée
      {table.getFilteredSelectedRowModel().rows.length > 1 ? "s" : ""}.
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
