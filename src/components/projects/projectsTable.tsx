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

const projects: Project[] = [
  {
    id: "D1E1F1A1-1B1C-1D1E-1F1A-1B1C1D1E1F1A",
    name: "Alpha",
    description: "A project focused on AI and machine learning.",
    updated_at: null,
    created_at: "2021-01-23T04:22:46.823058+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D1E-1F1A-1B1C1D1E1F1B",
    name: "Beta",
    description: "Developing next-generation web technologies.",
    updated_at: null,
    created_at: "2022-08-26T12:56:23.457369+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D1E-1F1A-1B1C1D1E1F1C",
    name: "Gamma",
    description: "A revolutionary mobile application.",
    updated_at: "2021-01-01T19:52:00.494459+00:00",
    created_at: "2020-01-17T16:07:42.182694+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D1E-1F1A-1B1C1D1E1F1D",
    name: "Delta",
    description: "Innovative solutions for data analysis.",
    updated_at: "2021-08-17T16:07:19.339459+00:00",
    created_at: "2022-08-22T00:15:23.583159+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D1E-1F1A-1B1C1D1E1F1E",
    name: "Epsilon",
    description: "Exploring the frontiers of quantum computing.",
    updated_at: null,
    created_at: "2020-05-19T16:46:32.142634+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D1E-1F1A-1B1C1D1E1F1F",
    name: "Zeta",
    description: "Sustainable energy research project.",
    updated_at: null,
    created_at: "2022-01-09T08:17:45.478871+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D1E-1F1A-1B1C1D1E2F1A",
    name: "Eta",
    description: "Advanced robotics and automation project.",
    updated_at: "2021-05-22T18:26:55.969306+00:00",
    created_at: "2020-05-28T11:58:47.065946+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D1E-1F1A-1B2C1D1E1F1A",
    name: "Theta",
    description: "Cutting-edge genetic research.",
    updated_at: "2022-12-17T14:38:02.330347+00:00",
    created_at: "2021-05-11T17:17:12.751533+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D1E-1F2A-1B1C1D1E1F1A",
    name: "Iota",
    description: "Space exploration technologies.",
    updated_at: null,
    created_at: "2020-07-01T17:17:20.025570+00:00",
  },
  {
    id: "D1E1F1A1-1B1C-1D2E-1F1A-1B1C1D1E1F1A",
    name: "Kappa",
    description: "Virtual reality development project.",
    updated_at: "2021-03-27T19:13:56.444892+00:00",
    created_at: "2020-02-16T02:50:09.471104+00:00",
  },
];

const ProjectsTable = () => {
  const { selectedTeam } = useTeams();
  const { data } = useApi({
    url: "/projects",
    condition: !!selectedTeam?.id,
    fetcher: () => getProjects(selectedTeam?.id!),
  });

  console.log({ selectedTeam });

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
      header: "Created",
      accessorKey: "created_at",
      cell: ({ row }) => moment(row.getValue("created_at")).format("ll"),
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
