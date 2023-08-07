import EmptyState from "@/components/ui/EmptyState"
import TattooListingGrid from "@/components/listings/TattooListingGrid"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { getSavedTattoosByUserId } from "@/actions/getSavedTattoosByUserId"
import Container from "@/components/ui/Container"
import Heading from "@/components/ui/Heading"
import ListingGrid from "@/components/listings/ListingGrid"
import TattooCard from "@/components/listings/TattooCard"

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
            <Heading title="Tatuajes guardados" subtitle="Estos son los tatuajes que has guardado" />
            <ListingGrid>
                {
                    tattoos.map(
                        (tattoo) => (<TattooCard data={tattoo} currentUser={currentUser} key={tattoo.id} />)
                    )
                }
            </ListingGrid>
        </Container>

    )
}

