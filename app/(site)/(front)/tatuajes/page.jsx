import { getCurrentUser } from '@/actions/getCurrentUser'
import getTattoos from '@/actions/getTattoos'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Search from '@/components/search/Search'
import ListingGrid from '@/components/listings/ListingGrid'
import EmptyState from '@/components/EmptyState'

//TODO:
// SITEMAP
// ROBOTS.TXT

export default async function TattoosPage() {

    const tattoos = await getTattoos()
    const currentUser = await getCurrentUser()

    if (artists.length < 1) {
        return (
            <EmptyState title="No se han encontrado tatuajes con esos filtros"
                subtitle="Modifica tus filtros para encontrar más resultados"
            />
        )
    }

    return (
        <>

            {/* Search will have:
        text search: will search tattoo description, tattoo content hidden text, artist name
        Filter by city
        Filter by style
        Filter by body part

         */}


            <Container>
                <Search />
                <Heading title={'Tatuajes'} />
                <ListingGrid
                    listings={tattoos}
                    currentUser={currentUser}
                    listingType="tattoos"
                />
            </Container>
        </>
    )
}
