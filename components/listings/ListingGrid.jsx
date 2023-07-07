'use client'

import { useRouter } from "next/navigation";
import ListingCard from "./ListingCard";

const ListingGrid = ({
    listings,
    currentUser,
    actionLabel,
    onAction,

}) => {

    const router = useRouter();

    if (actionLabel === "Editar") {
        onAction = (id) => {
            router.push(`/admin/tatuajes/${id}`)
        }
    }

    return (
        <div className="
    grid
    grid-cols-1
    gap-8
    pt-24
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    ">
            {listings.map((listing) => (

                <ListingCard
                    key={listing.id}
                    data={listing}
                    // reservation={ }
                    onAction={onAction}
                    disabled={false}
                    actionLabel={actionLabel || undefined}
                    actionId={listing.id}
                    currentUser={currentUser}
                />

            ))}

        </div>
    )
};
export default ListingGrid;