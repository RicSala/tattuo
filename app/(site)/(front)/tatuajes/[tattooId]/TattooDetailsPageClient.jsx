'use client'

import ArtistSmallCard from "@/components/ArtistSmallCard";
import ShareButtons from "@/components/ShareButtons";
import TattooCard from "@/components/listings/TattooCard";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
import Image from "next/image";

const TattooDetailsPageClient = ({
    tattoo,
    currentUser,
    similarTattoos
}) => {


    const age = Math.floor((new Date() - new Date(tattoo.createdAt)) / (1000 * 60 * 60 * 24));

    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Title: {tattoo.title}</h1>
            <TattooCard data={tattoo} currentUser={currentUser}
                listingType="tattoos" />
            {
                <p> {
                    age === 0 ? 'Publicado hoy' :

                        age > 1 ? `Publicado hace ${age} días` :
                            `Publicado ayer`
                } </p>
            }
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
            <ShareButtons url={`http://localhost:3000/tatuajes/${tattoo.id}`} />
            <h2 className="mt-20 font-bold text-lg">También te pueden gustar...</h2>
            <TattooListingGrid
                listings={similarTattoos}
                currentUser={currentUser}
                listingType="tattoos"
            />


        </div>
    )
};
export default TattooDetailsPageClient;