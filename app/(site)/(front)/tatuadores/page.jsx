import { getArtist } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import ArtistCard from '@/components/listings/ArtistCard'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import EmptyState from '@/components/ui/EmptyState'
import Search from '@/components/search/SearchBar'
import { getStyleList } from '@/libs/getStyleList'
import { getCities } from '@/libs/getCities'
import ListingGrid from '@/components/listings/ListingGrid'
export const dynamic = "force-dynamic";


//TODO:
// SITEMAP
// ROBOTS.TXT

const styles = getStyleList()
const cities = getCities()


export default async function ArtistPage({ searchParams }) {

    const artists = await getArtist(searchParams)
    const currentUser = await getCurrentUser()

    const filtro1 = {
        label: 'Estilos',
        value: 'styles',
        options: styles
    }

    const filtro2 = {
        label: 'Ciudad',
        value: 'city',
        options: cities
    }



    if (artists.length < 1) {
        return (
            <Container>
                <Search filtro1={filtro1} filtro2={filtro2} />
                <EmptyState title="No se han encontrado tatuadores con esos filtros"
                    subtitle="Modifica tus filtros para encontrar más resultados"
                    actionUrl={'/tatuadores'}
                    actionLabel={'Quitar filtros'}
                />
            </Container>
        )
    }

    return (
        <>
            <Container>
                <Search filtro1={filtro1} filtro2={filtro2} />
                <Heading title="Tatuadores" />
                <ListingGrid>
                    {artists.map((artist) => {
                        return (
                            <ArtistCard key={artist.id} artist={artist} currentUser={currentUser} />
                        )
                    })}
                </ListingGrid>
            </Container>
        </>
    )
}