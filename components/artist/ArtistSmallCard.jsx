'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import Avatar from "../ui/Avatar";
import ArtistSocials from "./ArtistSocials";


const ArtistSmallCard = ({
    artist,

}) => {

    const router = useRouter();
    return (
        <div className="rounded-lg cursor-pointer"
            onClick={() => router.push(`/tatuadores/profile/${artist.id}`)}>
            <div className="mx-auto flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
                <div className="rounded-full relative mb-4 md:mr-6 md:mb-0">
                    <Avatar user={artist} isArtist={true} />
                </div>
                <div className="">
                    <p className="text-xl font-medium text-primary">{artist.artisticName}</p>
                    <p className="mb-4 text-sm font-medium text-primary">{
                        // Firts 50 charts of artist.bio, then "..."
                        artist.bio.length > 50 ? artist.bio.substring(0, 50) + "..." : artist.bio
                    }</p>
                    <h2 className="font-bold">Redes sociales</h2>
                    <ArtistSocials artist={artist} />
                </div>
            </div>

        </div >
    )
};
export default ArtistSmallCard;