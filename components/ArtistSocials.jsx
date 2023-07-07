const ArtistSocials = ({
    artist
}) => {
    return (
        <div>
            <h2>Redes sociales</h2>

            <ul>
                <li>Instagram: {artist.instagram}</li>
                <li>Facebook: {artist.facebook}</li>
                <li>Youtube: {artist.youtube}</li>
                <li>Twitter: {artist.twitter}</li>
            </ul>

        </div>
    )
};
export default ArtistSocials;