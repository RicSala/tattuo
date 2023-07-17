import EmptyState from "@/components/EmptyState";
import { getBoardById } from "@/actions/getBoardById";
import TattooCard from "@/components/listings/TattooCard";

const TattooDetailsPage = async ({ params }) => {


    const board = await getBoardById(params.boardId);
    const tattoos = board.tattoos

    if (!board) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }

    return (

        <>
            {
                tattoos.map(tattoo => (
                    <TattooCard key={tattoo.id} data={tattoo} />
                ))

            }

        </>
    )
};

export default TattooDetailsPage;