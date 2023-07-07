'use client'

import { useRouter } from "next/navigation";
import HeartButton from "./HeartButton";
import SaveButton from "./saveButton";


const ArtistSmallCard = ({
    artist,

}) => {

    const router = useRouter();
    return (
        <div className="bg-slate-500 rounded-lg cursor-pointer"
            onClick={() => router.push(`/tatuadores/${artist.id}`)}>
            <h1>Artist: {artist.artisticName}</h1>
            {/*TODO: Artist need artistic name! */}
            <h2>Bio</h2>
            <p>{artist.bio}</p>

            <h2>Redes sociales</h2>
            <ul>
                <li>Instagram: {artist.instagram}</li>
                <li>Facebook: {artist.facebook}</li>
                <li>Twitter: {artist.twitter}</li>
            </ul>

        </div >
    )
};
export default ArtistSmallCard;