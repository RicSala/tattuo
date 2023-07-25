import EmptyState from "@/components/ui/EmptyState";
import { getBoardById } from "@/actions/getBoardById";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import ListingGrid from "@/components/listings/ListingGrid";
import TattooCard from "@/components/listings/TattooCard";

const TattooDetailsPage = async ({ params }) => {


    const currentUser = await getCurrentUser()
    const board = await getBoardById(params.boardId);
    const tattoos = board.tattoos.map(boardTattoo => boardTattoo.tattoo)

    if (!tattoos || tattoos.length === 0) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }
    return (
        <Container>
            <Heading title={`Tu tablero: ${board.title}`} />

            <ListingGrid>
                {
                    tattoos.map(tattoo => (
                        <TattooCard key={tattoo.id}
                            data={tattoo}
                            listingType={'tattoos'}
                            currentUser={currentUser}
                            boardAdder={false}
                            actionLabel={'Eliminar de tablero'}
                            // onAction={deleteFromBoard}
                            actionId={tattoo.id}
                            secondaryActionId={board.id}
                        />
                    ))
                }

            </ListingGrid>
        </Container>
    )
};

export default TattooDetailsPage;