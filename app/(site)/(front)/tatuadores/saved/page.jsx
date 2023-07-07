import Container from "@/components/Container"
import EmptyState from "@/components/EmptyState"
import ListingGrid from "@/components/listings/ListingGrid"
import { getCurrentUser } from "@/actions/getCurrentUser"
import SavedTattosPageClient from "./TatuajesClient"
import { getSavedTattoosByUserId } from "@/actions/getSavedTattoosByUserId"
import { getSavedArtistsByUserId } from "@/actions/getSavedArtistByUserId"

export default async function SavedArtistsPage() {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const artists = await getSavedArtistsByUserId(currentUser.id)

    if (artists.length < 1) {
        return (
            <EmptyState title="No tienes ningún tatuador guardado"
                subtitle="Registra tus propiedades para empezar a recibir reservas"
            />
        )
    }


    return (

        <Container>
            <SavedTattosPageClient
                artists={artists}
                currentUser={currentUser}
            />
        </Container>
    )
}

