"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { Skeleton } from "./ui/skeleton";

interface DataTableProps<TData, TValue> {
  isLoading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelect: (id: string) => void;
  paginationConfig: {
    rowCount: number;
    pagination: PaginationState;
    setPagination: Dispatch<SetStateAction<PaginationState>>;
  };
}

export function DataTable<TData extends { id: string }, TValue>({
  isLoading,
  columns,
  onRowSelect,
  data,
  paginationConfig,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      rowSelection,
      pagination: paginationConfig.pagination,
    },
    rowCount: paginationConfig.rowCount,
    onPaginationChange: paginationConfig.setPagination,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    enableMultiRowSelection: false,
  });

  useEffect(() => {
    if (Object.keys(rowSelection).length === 1) {
      onRowSelect(Object.keys(rowSelection)[0] ?? "");
      return;
    }
    onRowSelect("");
  }, [rowSelection, onRowSelect]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from("abcde").map((x) => (
              <TableRow key={x}>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="h-5" />
                </TableCell>
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
