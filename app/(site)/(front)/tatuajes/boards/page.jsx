import { getCurrentUser } from '@/actions/getCurrentUser'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import EmptyState from '@/components/ui/EmptyState'
import Link from "next/link";
import ListingGrid from '@/components/listings/ListingGrid'
import Image from 'next/image'
import { getTattoosByBoardId } from '@/actions/getTattoosByBoardId';



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
                <Heading title={'Tus tableros'} />
                <ListingGrid>

                    {
                        boardsWithFirstTattoo.map(board => (
                            <Link key={board.id} href={`/tatuajes/boards/${board.id}`}>
                                <div className="
                        bg-white
                        rounded-lg
                        p-4
                        shadow-md
                        hover:shadow-lg
                        transition-shadow
                        duration-200
                        ">

                                    <div key={board.id}>
                                        <h2>{board.title}</h2>
                                    </div>
                                    {/* show the imageSrc of tattoo */}
                                    <Image
                                        src={board.firstTattoo || '/images/placeholder.png'}
                                        alt="image" width={100} height={200}
                                        style={{ width: 'auto' }} />
                                </div>
                            </Link>
                        ))

                    }
                </ListingGrid>
            </Container>
        </>
    )
}