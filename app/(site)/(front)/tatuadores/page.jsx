import { getArtists } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import ArtistCard from '@/components/listings/ArtistCard'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import EmptyState from '@/components/ui/EmptyState'
import Search from '@/components/search/SearchBar'
import { getStyleList } from '@/libs/getStyleList'
import { getCities } from '@/libs/getCities'
import ListingGridWithInfinite from '@/components/listings/ListingGridWithInfinite'
export const dynamic = "force-dynamic";


//TODO:
// SITEMAP
// ROBOTS.TXT

const styles = getStyleList()
const cities = getCities()

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
const endpoint = 'http://localhost:3000/api/artists'

const numberOfPagesToLoad = 1
const sizePerPage = 5
const initialDataSize = (numberOfPagesToLoad * sizePerPage)

export default async function ArtistPage({ searchParams }) {

    const artists = await getArtists(
        searchParams,
        0,
        initialDataSize
    )


    const currentUser = await getCurrentUser()


    const serverLoadedArtists = artists.slice(0, initialDataSize)
    const serverHasMoreArtists = artists.length > initialDataSize




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
        <Container>
            <Search filtro1={filtro1} filtro2={filtro2} />
            <Heading title="Tatuadores" />
            <ListingGridWithInfinite // to render an infinite scroll we need...
                initialData={serverLoadedArtists} // the initial data coming from the server
                sizePerPage={sizePerPage} // the size of each page
                endpoint={endpoint}  // the endpoint to fetch more data in a client component
                hasMore={serverHasMoreArtists} // if there are more items to load
                Component={ArtistCard} // the component to render for each item
                keyProp="artist" // the key prop to use to identify each item
                currentUser={currentUser} // the current user to check if the user is logged in
            >

            </ListingGridWithInfinite>
        </Container>
    )
}