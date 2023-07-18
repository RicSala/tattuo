import { getArtistByCityName } from "@/actions/getArtistByCityName";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ArtistCard from "@/components/listings/ArtistCard";
import ListingGrid from "@/components/listings/ListingGrid";
import { notFound } from 'next/navigation'


const page = async ({ params }) => {


    const { cityName } = params;
    const artists = await getArtistByCityName(cityName);
    if (!artists || artists.length === 0) {
        console.log("page not found")
        notFound()
    }
    console.log(artists)
    const currentUser = getCurrentUser();



    console.log(cityName)
    return (
        <Container>
            <Heading title={`Tatuadores en ${cityName || 'Madrid'}`} />
            <ListingGrid items={artists}>
                {
                    artists.map((artist) => {
                        return <ArtistCard key={artist.id} artist={artist} currentUser={currentUser} />
                    }
                    )
                }
            </ListingGrid>
        </Container>
    )
};
export default page;