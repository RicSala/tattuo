import { getCurrentUser } from '@/actions/getCurrentUser'
import getTattoos from '@/actions/getTattoos'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Search from '@/components/search/SearchBar'
import TattooListingGrid from '@/components/listings/TattooListingGrid'
import EmptyState from '@/components/EmptyState'
import { getStyleList } from '@/libs/getStyleList'

//TODO:
// SITEMAP
// ROBOTS.TXT
const styles = getStyleList()

export default async function TattoosPage({ searchParams }) {

    const tattoos = await getTattoos(searchParams)
    const currentUser = await getCurrentUser()

    if (tattoos.length < 1) {
        return (
            <Container>
                <EmptyState title="No se han encontrado tatuajes con esos filtros"
                    subtitle="Modifica tus filtros para encontrar más resultados"
                    actionUrl={'/tatuajes'}
                    actionLabel={'Quitar filtros'}
                />
            </Container>
        )
    }

    return (
        <>
            <Container>
                <Search />
                <Heading title={'Tatuajes'} />
                <TattooListingGrid
                    listings={tattoos}
                    currentUser={currentUser}
                    listingType="tattoos"
                />
            </Container>
        </>
    )
}
