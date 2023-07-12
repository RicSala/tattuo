'use client'

import ArtistCard from "@/components/listings/ArtistCard";
import Container from "@/components/Container";
import TattooCard from "@/components/listings/TattooCard";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
import { useRouter } from "next/navigation";

const SavedTattosPageClient = ({
    artists,
    currentUser

}) => {

    const router = useRouter();
    return (
        <Container>
            {artists.map((artist) => {
                return (
                    <div className="flex flex-wrap justify-between" key={artist.id}>
                        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                            <ArtistCard key={artist.id} artist={artist} currentUser={currentUser} />
                        </div>
                    </div>

                )
            })}
        </Container>
    )
};
export default SavedTattosPageClient;