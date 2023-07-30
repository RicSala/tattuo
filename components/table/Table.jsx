import { cn } from "@/libs/cn"
import React from "react"


// Native tables has this shape:
// <table>
//     <caption>...</caption> // Optional, table caption
//     <thead> // Table header
//         <tr> 
//             <th>...</th> // table head...er? 
//             <th>...</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr> // Repeat for each row
//             <td>...</td> // table cell
//             <td>...</td>
//         </tr>
//     </tbody>
// </table>


// Creates a table and forwards the ref to the table element
const Table = React.forwardRef(({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
        <table
            ref={ref} // Forward the ref to the table element, so the parent can access it
            className={cn("w-full caption-bottom text-sm", className)} // merge and forward the className with tailwind-merge and clsx
            {...props} // Forward the rest of the props
        />
    </div>
))
Table.displayName = "Table" // Use for React debugging tools


const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"


const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
    />
))
TableBody.displayName = "TableBody"


const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn("bg-primary font-medium text-primary-foreground", className)}
        {...props}
    />
))
TableFooter.displayName = "TableFooter"


const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr ref={ref} className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
    )}{...props} />
))
TableRow.displayName = "TableRow"


const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
            className
        )}
        {...props}
    />
))
TableHead.displayName = "TableHead"


const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
        {...props}
    />
))
TableCell.displayName = "TableCell"


const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn("mt-4 text-sm text-muted-foreground", className)}
        {...props}
    />
))
TableCaption.displayName = "TableCaption"

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
}


