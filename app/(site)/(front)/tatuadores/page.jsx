import { getArtist } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import getTattoos from '@/actions/getTattoos'
import ArtistCard from '@/components/ArtistCard'
import ArtistSearchBar from '@/components/search/ArtistSearchBar'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Search from '@/components/search/Search'
import ListingGrid from '@/components/listings/ListingGrid'
import EmptyState from '@/components/EmptyState'

//TODO:
// SITEMAP
// ROBOTS.TXT

export default async function ArtistPage({ searchParams }) {

    const artists = await getArtist(searchParams)
    const currentUser = await getCurrentUser()


    if (artists.length < 1) {
        return (
            <>
                <ArtistSearchBar />

                <EmptyState title="No se han encontrado tatuador@s con esos filtros"
                    subtitle="Modifica tus filtros para encontrar más resultados"
                />

            </>
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
                <ArtistSearchBar />

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