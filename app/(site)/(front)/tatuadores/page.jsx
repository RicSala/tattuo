import { getArtist } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import ArtistCard from '@/components/ArtistCard'
import ArtistSearchBar from '@/components/search/ArtistSearchBar'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import EmptyState from '@/components/EmptyState'
import Search from '@/components/search/SearchBar'
import { getStyleList } from '@/libs/getStyleList'
import { getCities } from '@/libs/getCities'

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
                <div className="flex flex-wrap justify-between">
                    {artists.map((artist) => {
                        return (
                            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2" key={artist.id}>
                                <ArtistCard key={artist.id} artist={artist} currentUser={currentUser} />
                            </div>

                        )
                    })}
                </div>
            </Container>
        </>
    )
}