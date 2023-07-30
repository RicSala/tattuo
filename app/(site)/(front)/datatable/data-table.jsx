'use client'
// For reference: https://ui.shadcn.com/docs/components/data-table
import {
    columnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,  // The core table object containing both state and API
    TableHeader, // Each header is either directly associated with or derived from its column def and provides header-specific APIs
    TableBody,
    TableFooter,
    TableHead,
    TableRow, // Each row mirrors its respective row data and provides row-specific APIs
    TableCell, // Each cell mirrors its respective row-column intersection and provides cell-specific APIs
    TableCaption,
} from "@/components/table/Table"
import Button from "@/components/ui/Button"
import { useState } from "react"


export function DataTable({
    columns,
    data,
    ...props
}) {
    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data, // The data to be displayed in the table
        columns, // this is taken from the file?
        getCoreRowModel: getCoreRowModel(), //TODO: Review this
        getPaginationRowModel: getPaginationRowModel(), //TODO: Review this. This will paginate in pages of 10
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })



    // const headerGroups = table.getHeaderGroups()
    // console.log("headerGroups", headerGroups)

    // const rowModel = table.getRowModel()
    // console.log("rowModel", rowModel)

    // const paginationRowModel = table.getPaginationRowModel()
    // console.log("paginationRowModel", paginationRowModel)

    console.log("table", table)

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                </TableHead>
                            ))}
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
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}

                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {
                //pagination controls
            }
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="primary" size="sm" label={
                    table.getCanPreviousPage() ? "Anterior" : "Primera página"
                } onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                />
                <Button variant="primary" size="sm" label={
                    table.getCanNextPage() ? "Siguiente" : "Última página"
                }
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                />
            </div>
        </div>
    )

}


