import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getArtistById } from "@/actions/getArtistById";
import ArtistDetailsPageClient from "./ArtistDetailsPageClient";
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId";

const ArtistDetailsPage = async ({ params }) => {


    console.log("params", params)
    const artist = await getArtistById(params.artistId);
    const artistTattoos = await getTattoosByArtistId(params.artistId);
    const currentUser = await getCurrentUser();

    if (!artist) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }

    return (

        <>
            <ArtistDetailsPageClient
                artist={artist}
                currentUser={currentUser}
                artistTattoos={artistTattoos}
            />

        </>
    )
};

export default ArtistDetailsPage;