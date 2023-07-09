'use client'

import ArtistPrices from "@/components/ArtistPrices";
import ArtistSocials from "@/components/ArtistSocials";
import HeartButton from "@/components/HeartButton";
import ListingGrid from "@/components/listings/ListingGrid";
import SaveButton from "@/components/SaveButton";

const ArtistDetailsPageClient = ({
    artist,
    artistTattoos,
    currentUser,
}) => {

    console.log("artist", artist)

    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Title: {artist.user.name}</h1>
            {/* <ListingCard data={artist} />
            <ArtistSmallCard artist={artist.artistProfile} /> */}
            <SaveButton listingId={artist.id} currentUser={currentUser}
                listingType="artists"
            />
            <HeartButton listingId={artist.id} currentUser={currentUser}
                listingType="artists"
            />

            {/* TODO: move to component */}

            {
                artist.likes?.length > 0 && (
                    <div className="flex flex-row items-center gap-1">
                        {artist.likes?.length} likes
                    </div>)

            }

            <ArtistSocials artist={artist} />
            <ArtistPrices artist={artist} />
            <ListingGrid listings={artistTattoos} currentUser={currentUser} />

        </div>
    )
};
export default ArtistDetailsPageClient;