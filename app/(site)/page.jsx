import { getArtist } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getFavoriteTattooIdsOfUser } from '@/actions/getFavoriteTattooIdsOfUser'
import getTattoos from '@/actions/getTattoos'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Search from '@/components/search/Search'
import ListingCard from '@/components/listings/ListingCard'
import ListingGrid from '@/components/listings/ListingGrid'
import Image from 'next/image'

//TODO:
// SITEMAP
// ROBOTS.TXT

export default async function Home({ searchParams }) {

    const tattoos = await getTattoos(searchParams)
    const artist = await getArtist(searchParams)
    const currentUser = await getCurrentUser()

    return (

        <Container>
            <div>
                <div className='mt-6'>
                    <Heading title={'Tatuajes'} />
                    <ListingGrid
                        listings={tattoos}
                        currentUser={currentUser}
                        listingType="tattoos" />
                </div>
                <div className='mt-6'>
                    <Heading title={'Tatuadores'} />
                    <ListingGrid
                        listings={artist}
                        currentUser={currentUser}
                        listingType="artists" />
                </div>
            </div>

        </Container>
    )
}
