import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getArtistById } from "@/actions/getArtistById";
import ArtistDetailsPageClient from "./ArtistDetailsPageClient";
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId";
import SaveButton from "@/components/SaveButton";
import HeartButton from "@/components/HeartButton";
import LikesCount from "@/components/LikesCount";
import ArtistSocials from "@/components/artist/ArtistSocials";
import ArtistPrices from "@/components/artist/ArtistPrices";
import Heading from "@/components/Heading";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
export const dynamic = "force-dynamic";


const ArtistDetailsPage = async ({ params }) => {


    // const artist = await getArtistById(params.artistId);
    // const artistTattoos = await getTattoosByArtistId(params.artistId);
    // const currentUser = await getCurrentUser();
    // instead of awaiting in series, we can await in parallel by using Promise.all
    const artistPromise = getArtistById(params.artistId);
    const artistTattoosPromise = getTattoosByArtistId(params.artistId);
    const currentUserPromise = getCurrentUser();

    const [artist, artistTattoos, currentUser] = await Promise.all([
        artistPromise, artistTattoosPromise, currentUserPromise]);

    if (!artist) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-3xl font-bold text-center mt-6"
            >{artist.artisticName}</h1>
            <SaveButton listingId={artist.id} currentUser={currentUser}
                listingType="artists" />
            <HeartButton listingId={artist.id} currentUser={currentUser}
                listingType="artists" />
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

export default ArtistDetailsPage;