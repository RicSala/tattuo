'use client'

import { useRouter } from "next/navigation";
import ListingCard from "./ListingCard";
import { toast } from "react-hot-toast";
import axios from "axios";

const ListingGrid = ({
    listings,
    listingType,
    currentUser,
    onAction,
    actionLabel,
    onSecondaryAction,
    secondaryActionLabel,


}) => {

    const router = useRouter();

    if (actionLabel === "Editar") {
        onAction = (id) => {
            router.push(`/admin/tatuajes/${id}`)
        }
    }

    if (secondaryActionLabel === "Eliminar") {
        onSecondaryAction = (id) => {
            axios.delete(`/api/tattoos/${id}`)
                .then(() => {
                    router.push(`/admin/tatuajes`)
                    toast.success("Tatuaje eliminado")
                })
                .catch((error) => {
                    toast.error("Error al eliminar el tatuaje")
                })
        }
    }

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
    ">
            {listings.map((listing) => (

                <ListingCard
                    key={listing.id}
                    data={listing}
                    listingType={listingType}
                    // reservation={ }
                    onAction={onAction}
                    actionLabel={actionLabel || undefined}
                    onSecondaryAction={onSecondaryAction}
                    secondaryActionLabel={secondaryActionLabel}
                    disabled={false}
                    actionId={listing.id}
                    currentUser={currentUser}
                />

            ))}

        </div>
    )
};
export default ListingGrid;