'use client'

import ListingCard from "@/components/listings/ListingCard";
import ListingGrid from "@/components/listings/ListingGrid";
import { useRouter } from "next/navigation";

const SavedTattosPageClient = ({
    artists,
    currentUser

}) => {

    const router = useRouter();
    return (
        artists.map((artist) => {
            return (
                <div className="bg-slate-500 rounded-lg cursor-pointer"
                    onClick={() => router.push(`/tatuadores/${artist.id}`)}
                    key={artist.id}
                >
                    <h1>Artist: {artist.bio}</h1>
                </div>)
        })
    )
};
export default SavedTattosPageClient;