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
            <ListingCard data={tattoo} currentUser={currentUser}
                listingType="tattoos" />
            <ArtistSmallCard artist={tattoo.artistProfile} />
            {/*TODO: move to a component? */}
            <div>
                {/* { `${tattoo.savesCount} saves}`} */}
                {
                    tattoo.likes?.length > 0 && (
                        <div className="flex flex-row items-center gap-1">
                            {tattoo.likes?.length} likes
                        </div>)


                }
            </div>

        </div>
    )
};
export default TattooDetailsPageClient;