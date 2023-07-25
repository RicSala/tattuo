import { BsFacebook, BsPinterest, BsWhatsapp, BsInstagram, BsTwitter, BsTiktok } from 'react-icons/bs';
import Link from 'next/link';


const ArtistSocials = ({
    artist
}) => {
    return (
        <div>
            <h2 className="
            text-2xl
            font-semibold
            text-primary
            mb-4
            ">Redes sociales</h2>

            <ul>
                {/* <li>Instagram: {artist.instagram}</li> */}
                {/* instagram icon and instagram HANDLE */}
                <li className="flex flex-row items-center gap-2">
                    <BsInstagram size={20} />
                    <Link href={`https://instagram.com/${artist.instagram}`} target="_blank" rel="noopener noreferrer">
                        {artist.instagram}
                    </Link>
                </li>

                <li className="flex flex-row items-center gap-2">
                    <BsFacebook size={20} />
                    <Link href={`https://facebook.com/${artist.facebook}`} target="_blank" rel="noopener noreferrer">
                        {artist.facebook}
                    </Link>
                </li>

                <li className="flex flex-row items-center gap-2">
                    <BsWhatsapp size={20} />
                    <Link href={`https://wa.me/${artist.whatsapp}`} target="_blank" rel="noopener noreferrer">
                        {artist.whatsapp}
                    </Link>
                </li>

                <li className="flex flex-row items-center gap-2">
                    <BsPinterest size={20} />
                    <Link href={`https://pinterest.com/${artist.pinterest}`} target="_blank" rel="noopener noreferrer">
                        {artist.pinterest}
                    </Link>
                </li>

                {/* twitter */}
                <li className="flex flex-row items-center gap-2">
                    <BsTwitter size={20} />
                    <Link href={`https://twitter.com/${artist.twitter}`} target="_blank" rel="noopener noreferrer">
                        {artist.twitter}
                    </Link>
                </li>

                {/* Tiktok */}
                <li className="flex flex-row items-center gap-2">
                    <BsTiktok size={20} />
                    <Link href={`https://tiktok.com/${artist.tiktok}`} target="_blank" rel="noopener noreferrer">
                        {artist.tiktok}
                    </Link>
                </li>




            </ul>

        </div>
    )
};
export default ArtistSocials;