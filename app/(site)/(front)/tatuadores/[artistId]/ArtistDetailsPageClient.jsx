'use client'

import ArtistPrices from "@/components/ArtistPrices";
import ArtistSocials from "@/components/ArtistSocials";
import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";
import LikesCount from "@/components/LikesCount";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
import SaveButton from "@/components/SaveButton";

const ArtistDetailsPageClient = ({
    artist,
    artistTattoos,
    currentUser,
}) => {


    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1>Title: {artist.user.name}</h1>
            <SaveButton listingId={artist.id} currentUser={currentUser}
                listingType="artists" />

            <HeartButton listingId={artist.id} currentUser={currentUser}
                listingType="artists" />

            {/* TODO: move to component */}

            <LikesCount likesArray={artist.likes} />

            <ArtistSocials artist={artist} />
            <ArtistPrices artist={artist} />
            <h2 className="mt-20 font-bold">Otros trabajos de {artist.artisticName}</h2>
            <div className="mt-6 w-full mx-auto">
                <Heading title={'Tatuadores'} />

                <TattooListingGrid listings={artistTattoos} currentUser={currentUser} listingType={'tattoos'} />

            </div>


        </div>
    )
};
export default ArtistDetailsPageClient;