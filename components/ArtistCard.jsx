import Image from "next/image";
import Avatar from "./Avatar";
import Link from "next/link";
import HeartButton from "./HeartButton";
import SaveButton from "./SaveButton";

const ArtistCard = ({
    artist,
    currentUser
}) => {

    console.log(artist)
    return (

        <div className="
         border
         rounded-2xl
         shadow-sm
         overflow-hidden
         group
         flex
         flex-col
        justify-between

        ">
            <Link href={`/tatuadores/${artist.id}`}>
                <div className="relative">
                    <div className="absolute top-3 right-3 z-[3]">
                        <HeartButton listingId={artist.id} currentUser={currentUser}
                            listingType="artists" />
                    </div>

                    <div className="absolute top-3 left-3 z-[3]">
                        <SaveButton listingId={artist.id} currentUser={currentUser}
                            listingType="artists" />
                    </div>

                    <div className="h-60 overflow-hidden">
                        <div className="inset-0 transition-transform">
                            <Image
                                fill={true}
                                src={artist.mainImage}
                                alt="profile picture"
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
                <div className="py-3 px-5 flex flex-row justify-start gap-6 items-center">
                    <Avatar user={artist} isArtist />
                    <p>{artist.artisticName}</p>
                </div>
                <div className="py-3 px-5">
                    Precios:
                </div>
            </Link>
        </div>
    )
};
export default ArtistCard;