'use client'

import ArtistPrices from "@/components/ArtistPrices";
import ArtistSocials from "@/components/ArtistSocials";
import ListingGrid from "@/components/listings/ListingGrid";
import SaveButton from "@/components/saveButton";

const ArtistDetailsPageClient = ({
    artist,
    artistTattoos,
    currentUser,
}) => {

    console.log("currentUser", currentUser)
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Title: {artist.user.name}</h1>
            {/* <ListingCard data={artist} />
            <ArtistSmallCard artist={artist.artistProfile} /> */}
            <SaveButton listingId={artist.id} currentUser={currentUser} />

            <ArtistSocials artist={artist} />
            <ArtistPrices artist={artist} />
            <ListingGrid listings={artistTattoos} currentUser={currentUser} />

        </div>
    )
};
export default ArtistDetailsPageClient;