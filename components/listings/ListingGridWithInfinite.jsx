'use client'

import { InfiniteScrollReal } from "../InfiniteScrollReal";
import CustomQueryClientProvider from "@/providers/QueryClientProvider";

// This is a wrapper component to render an infinite scroll
// its job is to create the grid, add the query client provider and pass the props to the infinite scroll component
const ListingGridWithInfinite = ({
    Component,
    endpoint,
    initialData,
    sizePerPage,
    keyProp, // new prop for the dynamic key
    currentUser,
    filter,

}) => {

    return (

        <div className="
            grid
            grid-cols-1
            gap-8
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            "
        >
            <CustomQueryClientProvider>
                <InfiniteScrollReal
                    endpoint={endpoint}
                    initialData={initialData}
                    sizePerPage={sizePerPage}
                    keyProp={keyProp}
                    Component={Component}
                    currentUser={currentUser}
                    filter={filter}
                />
            </CustomQueryClientProvider>

        </div>


    )
}


export default ListingGridWithInfinite;