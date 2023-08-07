'use client'

import { forwardRef } from "react";

const ListingGrid = forwardRef(({ children }, ref) => {
    return (

        <div className="
            grid
            grid-cols-1
            gap-8

            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-3
            2xl:grid-cols-4
            "
            ref={ref}
        >
            {children}
        </div>


    )
})

ListingGrid.displayName = "ListingGrid"

export default ListingGrid;