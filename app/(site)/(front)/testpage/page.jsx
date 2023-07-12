import { getArtist } from "@/actions/getArtists";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getTattoos from "@/actions/getTattoos";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ArtistCard from "@/components/listings/ArtistCard";
import ListingGrid from "@/components/listings/ListingGrid";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
export const dynamic = "force-dynamic";


const page = async ({
    searchParams

}) => {

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
                    <Heading title={'Tatuador@s'} />
                    <ListingGrid>
                        {artists.map((artist) => (
                            <ArtistCard key={artist.id} artist={artist} currentUser={currentUser} />
                        ))}
                    </ListingGrid>
                </div>
            </div>

        </Container>
    )
};
export default page;