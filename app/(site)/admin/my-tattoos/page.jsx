import { getCurrentUser } from "@/actions/getCurrentUser"
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId"
import Container from "@/components/Container"
import ListingGrid from "@/components/listings/ListingGrid"

export default async function MyTattoosPage() {

    const currentUser = await getCurrentUser()
    const listings = await getTattoosByArtistId(currentUser.artistProfileId)

    return (

        <Container>
            <ListingGrid
                listings={listings}
                currentUser={currentUser}
            />
        </Container>
    )
}

