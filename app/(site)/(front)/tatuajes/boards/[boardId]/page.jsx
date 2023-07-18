import EmptyState from "@/components/EmptyState";
import { getBoardById } from "@/actions/getBoardById";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NewClientBoardPage from "./ClientBoardPage";

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
        <NewClientBoardPage board={board} tattoos={tattoos} currentUser={currentUser} />

    )
};

export default TattooDetailsPage;