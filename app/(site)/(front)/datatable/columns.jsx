"use client"

import Button from "@/components/ui/Button"
import RowActions from "./rowActions"


// Objects used to configure a column and its data model, display templates, and more. Responsible for:
// - Building the underlying data model that will be used for everything including sorting, filtering, grouping, etc.
// - Formatting the data model into what will be displayed in the table
// - Creating header groups, headers and footers
// - Creating columns for display-only purposes, eg. action buttons, checkboxes, expanders, sparklines, etc.
export const columns = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "artisticName",
        header: ({ column }) => <Button
            label="Nombre artístico"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant="primary" size="sm"
        />,
    },
    {
        accessorKey: "Completo",
        header: "isComplete",
    },
    {
        accessorKey: "saves",
        header: "Guardados",
    },
    {
        accessorKey: "pricePerHour",
        header: () => <div className="text-center bg-primary text-primary-foreground">Precio por hora</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("pricePerHour"))
            const formattedAmount = new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
            }).format(amount)
            return <div className="text-center">{formattedAmount}/hora</div>
        },
    },
    // add an action column
    {
        accessorKey: "actions",
        header: "Perfil",
        cell: ({ row }) => {
            return <RowActions row={row} />
        },
    },
]