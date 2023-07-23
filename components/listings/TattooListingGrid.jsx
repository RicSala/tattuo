'use client'

import { useRouter } from "next/navigation";
import TattooCard from "./TattooCard";
import { toast } from "react-hot-toast";
import axios from "axios";

const TattooListingGrid = ({
    listings,
    listingType,
    currentUser,
    onAction,
    actionLabel,
    onSecondaryAction,
    secondaryActionLabel,
    canLike = true,
    canSave = true,


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
                    router.refresh()
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
    justify-center
    content-center
    ">
            {listings.map((listing) => (
                <TattooCard
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
                    canLike={canLike}
                    canSave={canSave}
                />
            ))}

        </div>
    )
};
export default TattooListingGrid;