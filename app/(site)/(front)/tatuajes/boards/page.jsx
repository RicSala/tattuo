import { getCurrentUser } from '@/actions/getCurrentUser'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import EmptyState from '@/components/ui/EmptyState'
import Link from "next/link";
import ListingGrid from '@/components/listings/ListingGrid'
import Image from 'next/image'
import { getTattoosByBoardId } from '@/actions/getTattoosByBoardId';
import BoardCard from '@/components/boards/BoardCard';



export default async function BoardsPage({ searchParams }) {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const boards = currentUser?.boards


    // add the first tattoo of each board to the board object as a promise to be resolved
    //TODO:  I am pretty sure there are better ways to do this...
    const boardsWithFirstTattoo = await Promise.all(boards.map(async board => {
        const boardTattoos = await getTattoosByBoardId(board.id)
        if (boardTattoos.length < 1) return ({ ...board, firstTattoo: null })
        return { ...board, firstTattoo: boardTattoos[0].imageSrc }
    }))



    if (!boards || boards.length < 1) {
        return (


            <Container>
                <EmptyState title="No has guardado aún ningún tablero"
                    subtitle="Crea un tablero para guardar tus tatuajes favoritos"
                    actionUrl={'/tatuajes'}
                    actionLabel={'Ver tatuajes'}
                />
            </Container>
        )
    }

    return (
        <>
            <Container>
                <Heading title={'Tus tableros'}
                    subtitle={'Guarda tus tatuajes en tableros y no los pierdas de vista!'}
                />
                <ListingGrid>

                    {
                        boardsWithFirstTattoo.map(board => (
                            <BoardCard board={board} key={board.id} />
                        ))

                    }
                </ListingGrid>
            </Container>
        </>
    )
}