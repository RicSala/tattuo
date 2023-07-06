import { getCurrentUser } from '@/actions/getCurrentUser'
import { getFavoriteIdsOfUser } from '@/actions/getFavoriteIdsOfUser'
import getListings from '@/actions/getListings'
import Container from '@/components/Container'
import ListingCard from '@/components/listings/ListingCard'
import ListingGrid from '@/components/listings/ListingGrid'
import Image from 'next/image'

export default async function Home() {

    const listings = await getListings()
    const currentUser = await getCurrentUser()

    return (

        <Container>
            <ListingGrid
                listings={listings}
                currentUser={currentUser}
            />
        </Container>
    )
}
