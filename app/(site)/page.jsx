import { getArtist } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import getTattoos from '@/actions/getTattoos'
import Container from '@/components/ui/Container'
import TattooListingGrid from '@/components/listings/TattooListingGrid'
import ListingGrid from '@/components/listings/ListingGrid'
import ArtistCard from '@/components/listings/ArtistCard'
import HeadingWithButton from '@/components/ui/HeadingWithButton'
export const dynamic = "force-dynamic";


//TODO:
// SITEMAP
// ROBOTS.TXT

export default async function Home({ searchParams }) {

    const tattoos = await getTattoos(searchParams)
    const artists = await getArtist(searchParams)
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
                            <ArtistCard key={artist.id} artist={artist} currentUser={currentUser} />
                        ))}
                    </ListingGrid>
                </div>
            </div>

        </Container>
    )
}
