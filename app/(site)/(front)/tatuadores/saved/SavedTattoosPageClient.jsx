'use client'

import ArtistCard from "@/components/listings/ArtistCard";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import ListingGrid from "@/components/listings/ListingGrid";
import Heading from "@/components/Heading";

const SavedTattosPageClient = ({
    artists,
    currentUser

}) => {

    const router = useRouter();
    return (
        <Container>
            <Heading title="Tatuador@s guardad@s"
                subtitle="Estos son l@s tatuador@s que has guardado" />
            <ListingGrid>
                {artists.map((artist) => {
                    return (
                        <ArtistCard key={artist.id} artist={artist} currentUser={currentUser} />
                    )
                })}
            </ListingGrid>
        </Container >
    )
};
export default SavedTattosPageClient;