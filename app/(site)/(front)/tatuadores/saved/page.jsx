import EmptyState from "@/components/ui/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getSavedArtistsByUserId } from "@/actions/getSavedArtistByUserId";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import ListingGrid from "@/components/listings/ListingGrid";
import ArtistCard from "@/components/listings/ArtistCard";

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
            <Container>
                <Heading title="Tatuador@s guardad@s"
                    subtitle="Estos son l@s tatuador@s que has guardado" />
                <ListingGrid>
                    {artists.map((artist) => {
                        return (
                            <ArtistCard key={artist.id} data={artist} currentUser={currentUser} />
                        )
                    })}
                </ListingGrid>
            </Container >

        </>
    )
};

export default SavedTattoosPage;