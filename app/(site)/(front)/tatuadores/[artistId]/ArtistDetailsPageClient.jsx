'use client'

import ArtistPrices from "@/components/ArtistPrices";
import ArtistSocials from "@/components/ArtistSocials";
import ListingGrid from "@/components/listings/ListingGrid";

const ArtistDetailsPageClient = ({
    artist,
    artistTattoos,
    currentUser,
}) => {

    console.log("ARTISTA", artist)
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Title: {artist.user.name}</h1>
            {/* <ListingCard data={artist} />
            <ArtistSmallCard artist={artist.artistProfile} /> */}

            <ArtistSocials artist={artist} />
            <ArtistPrices artist={artist} />
            <ListingGrid listings={artistTattoos} />

        </div>
    )
};
export default ArtistDetailsPageClient;