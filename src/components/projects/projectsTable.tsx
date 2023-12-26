"use client";
import { Project } from "@/lib/types/project";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import moment from "moment";
import Link from "next/link";
import DataTablePagination from "../shared/dataTablePagination";
import { getFormattedName } from "@/lib/projects";
import { useApi } from "@/hooks/useApi";
import { getProjects } from "@/actions/projects";
import { useTeams } from "@/contexts/teamsContext";

const ProjectsTable = () => {
  const { selectedTeam } = useTeams();
  const { data } = useApi({
    url: "/projects",
    condition: !!selectedTeam?.id,
    fetcher: () => getProjects(selectedTeam?.id!),
  });

  const projects: Project[] = data?.data || [];

  const columns: ColumnDef<Project>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <Link
            href={`/dashboard/projects/${getFormattedName(row.original.name)}`}
            className="text-blue-600 underline text-xs"
          >
            {row.getValue("name")}
          </Link>
        );
      },
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Start date",
      accessorKey: "dates",
      cell: ({ row }) => (
        <span>{moment(row.original.dates?.from).format("ll")}</span>
      ),
    },
    {
      header: "End Date",
      accessorKey: "dates",
      cell: ({ row }) => (
        <span>{moment(row.original.dates?.to).format("ll")}</span>
      ),
    },
    {
      header: "Updated",
      accessorKey: "updated_at",
      cell: ({ row }) =>
        row.getValue("updated_at")
          ? moment(row.getValue("updated_at")).format("ll")
          : null,
    },
    {
      header: "Actions",
      accessorKey: "actions",
    },
  ];

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  return (
    <div className="border bg-white rounded-md overflow-hidden">
      <div className="">
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
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs">
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-2 border-t">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default ProjectsTable;
