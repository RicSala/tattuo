import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import SavedTattosPageClient from "./SavedTattoosPageClient";
import { getSavedArtistsByUserId } from "@/actions/getSavedArtistByUserId";

const SavedTattoosPage = async ({ params }) => {


    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const artists = await getSavedArtistsByUserId(currentUser.id)

    if (artists.length < 1) {
        return (
            <EmptyState title="No tienes ningún(a) tatuador(a) guardad@"
                subtitle="Guarda tatuadorxs para inspirarte y poder verlos más tarde"
            />
        )
    }

    return (

        <>
            <SavedTattosPageClient
                artists={artists}
                currentUser={currentUser}
            />

        </>
    )
};

export default SavedTattoosPage;