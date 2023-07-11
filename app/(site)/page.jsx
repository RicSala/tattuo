import { getArtist } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getFavoriteTattooIdsOfUser } from '@/actions/getFavoriteTattooIdsOfUser'
import getTattoos from '@/actions/getTattoos'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Search from '@/components/search/SearchBar'
import TattooCard from '@/components/listings/TattooCard'
import TattooListingGrid from '@/components/listings/TattooListingGrid'
import Image from 'next/image'
import ListingGrid from '@/components/ListingGrid'
import ArtistCard from '@/components/ArtistCard'

//TODO:
// SITEMAP
// ROBOTS.TXT

export default async function Home({ searchParams }) {

    const tattoos = await getTattoos(searchParams)
    const artists = await getArtist(searchParams)
    const currentUser = await getCurrentUser()

    return (

        <Container>
            <div>
                <div className='mt-6'>
                    <Heading title={'Tatuajes'} />
                    <TattooListingGrid
                        listings={tattoos}
                        currentUser={currentUser}
                        listingType="tattoos" />
                </div>
                <div className='mt-6'>
                    <Heading title={'Tatuadores'} />
                    <ListingGrid>
                        {artists.map((artist) => (
                            <ArtistCard key={artist.id} artist={artist} currentUser={currentUser} />
                        ))}
                    </ListingGrid>
                </div>
            </div>

        </Container>
    )
}
