import { getArtists } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import Container from '@/components/ui/Container'
import TattooListingGrid from '@/components/listings/TattooListingGrid'
import ListingGrid from '@/components/listings/ListingGrid'
import ArtistCard from '@/components/listings/ArtistCard'
import HeadingWithButton from '@/components/ui/HeadingWithButton'
import { getTattoos } from '@/actions/getTattoos'
export const dynamic = "force-dynamic";


//TODO:
// SITEMAP
// ROBOTS.TXT

export default async function Home({ searchParams }) {

    const tattoos = await getTattoos(searchParams)
    const artists = await getArtists(searchParams)
    const filteredArtists = artists.filter(artist => artist.isComplete)
    const currentUser = await getCurrentUser()


    return (

        <Container>
            <div>
                <div className='mt-6'>
                    <HeadingWithButton title={'Descubre Tatuajes!'} />
                    <TattooListingGrid
                        listings={tattoos}
                        currentUser={currentUser}
                        listingType="tattoos" />
                </div>
                <div className='mt-6'>
                    <HeadingWithButton title={'Descubre tatuador@s!'} />
                    <ListingGrid>
                        {filteredArtists.map((artist) => (
                            <ArtistCard key={artist.id} data={artist} currentUser={currentUser} />
                        ))}
                    </ListingGrid>
                </div>
            </div>

        </Container>
    )
}
