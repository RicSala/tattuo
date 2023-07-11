import EmptyState from "@/components/EmptyState"
import TattooListingGrid from "@/components/listings/TattooListingGrid"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { getSavedTattoosByUserId } from "@/actions/getSavedTattoosByUserId"
import Container from "@/components/Container"

export default async function SavedArtistsPage() {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const tattoos = await getSavedTattoosByUserId(currentUser.id)

    if (tattoos.length < 1) {
        return (
            <EmptyState title="No tienes ningún tatuaje guardado"
                subtitle="Guarda tatuajes para inspirarte y poder verlos más tarde"
            />
        )
    }


    return (

        <Container>
            <TattooListingGrid listings={tattoos} currentUser={currentUser}
                listingType="tattoos"
            />
        </Container>

    )
}

