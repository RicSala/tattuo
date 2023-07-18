'use client'

// NOT USED!

import ArtistPrices from "@/components/artist/ArtistPrices";
import ArtistSocials from "@/components/artist/ArtistSocials";
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
            <h1 className="text-3xl font-bold text-center mt-6"
            >{artist.user.name}</h1>
            <SaveButton listingId={artist.id} currentUser={currentUser}
                listingType="artists" />

            <HeartButton listingId={artist.id} currentUser={currentUser}
                listingType="artists" />

            {/* TODO: move to component */}

            <LikesCount likesArray={artist.likes} />

            <ArtistSocials artist={artist} />
            <ArtistPrices artist={artist} />
            <div className="mt-6 w-full mx-auto">
                <Heading title={`Otros trabajos de ${artist.artisticName}`} />

                <TattooListingGrid listings={artistTattoos} currentUser={currentUser} listingType={'tattoos'} />

            </div>


        </div>
    )
};
export default ArtistDetailsPageClient;