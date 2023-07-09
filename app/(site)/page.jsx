import { getArtist } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getFavoriteTattooIdsOfUser } from '@/actions/getFavoriteTattooIdsOfUser'
import getTattoos from '@/actions/getTattoos'
import Container from '@/components/Container'
import ListingCard from '@/components/listings/ListingCard'
import ListingGrid from '@/components/listings/ListingGrid'
import Image from 'next/image'

//TODO:
// SITEMAP
// ROBOTS.TXT

export default async function Home() {

    const tattoos = await getTattoos()
    const artist = await getArtist()
    const currentUser = await getCurrentUser()

    return (

        <Container>
            <h2>Tatuajes</h2>
            <ListingGrid
                listings={tattoos}
                currentUser={currentUser}
                listingType="tattoos"
            />

            <h2 className='mt-20'>Tatuadores</h2>
            <ListingGrid
                listings={artist}
                currentUser={currentUser}
                listingType="artists"
            />

        </Container>
    )
}
