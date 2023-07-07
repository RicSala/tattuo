import { getCurrentUser } from "@/actions/getCurrentUser"
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId"
import Container from "@/components/Container"
import EmptyState from "@/components/EmptyState"
import TatuajesClient from "./TatuajesClient"
import ListingGrid from "@/components/listings/ListingGrid"

export default async function MyTattoosPage() {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const listings = await getTattoosByArtistId(currentUser.artistProfileId)

    if (!listings) {
        return (
            <EmptyState title="No tienes ninguna propiedad"
                subtitle="Registra tus propiedades para empezar a recibir reservas"
            />
        )
    }


    return (

        <Container>
            <ListingGrid
                listings={listings}
                currentUser={currentUser}
                actionLabel="Editar"

            />
        </Container>
    )
}

