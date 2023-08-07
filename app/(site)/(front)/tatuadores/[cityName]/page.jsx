import { getArtistsByCityName } from "@/actions/getArtistsByCityName";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import ArtistCard from "@/components/listings/ArtistCard";
import ListingGrid from "@/components/listings/ListingGrid";
import { notFound } from 'next/navigation'


const CityPage = async ({ params }) => {


    const { cityName } = params;
    const artists = await getArtistsByCityName(cityName);

    if (!artists || artists.length === 0) {
        notFound()
    }
    const currentUser = await getCurrentUser();

    return (
        <Container>
            <Heading title={`Tatuadores en ${cityName || 'Madrid'}`} />
            <ListingGrid items={artists}>
                {
                    artists.map((artist) => {
                        return <ArtistCard key={artist.id} data={artist} currentUser={currentUser} />
                    }
                    )
                }
            </ListingGrid>
        </Container>
    )
};
export default CityPage;