'use client'

import ListingGrid from "@/components/listings/ListingGrid";
import { useRouter } from "next/navigation";

const TatuajesClient = ({
    listings,
    currentUser

}) => {

    const router = useRouter();
    return (
        <ListingGrid
            listings={listings}
            currentUser={currentUser}
        />
    )
};
export default TatuajesClient;