'use client'

import ArtistSmallCard from "@/components/ArtistSmallCard";
import ListingCard from "@/components/listings/ListingCard";
import Image from "next/image";

const TattooDetailsPageClient = ({
    tattoo,
    currentUser,
}) => {

    console.log("tattoo", tattoo)
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Title: {tattoo.title}</h1>
            <ListingCard data={tattoo} />
            <ArtistSmallCard artist={tattoo.artistProfile} />

        </div>
    )
};
export default TattooDetailsPageClient;