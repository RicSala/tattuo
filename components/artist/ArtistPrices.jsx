const ArtistPrices = ({
    artist
}) => {

    //TODO: cambiar max price por min price
    return (
        <div>
            <h2
                className="
                text-2xl
            font-semibold
            text-primary
            mb-4">Precios</h2>
            <ul>
                <li>Media por hora: {artist.pricePerHour}</li>
                <li>Por sessión: {artist.pricePerSession}</li>
                <li>Trabajo mínimo: {artist.maxPrice}</li>
            </ul>
        </div>
    )
};
export default ArtistPrices;