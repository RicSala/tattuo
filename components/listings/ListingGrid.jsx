import ListingCard from "./ListingCard";

const ListingGrid = ({
    listings,
    currentUser,
}) => {

    return (
        <div className="
    grid
    grid-cols-1
    gap-8
    pt-24
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    ">
            {listings.map((listing) => (

                <ListingCard
                    key={listing.id}
                    data={listing}
                    // reservation={ }
                    // onAction={}
                    disabled={false}
                    actionLabel={"Reservar"}
                    actionId={"test"}
                    currentUser={currentUser}
                />

            ))}

        </div>
    )
};
export default ListingGrid;