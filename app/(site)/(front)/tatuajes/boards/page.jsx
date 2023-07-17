import { getCurrentUser } from '@/actions/getCurrentUser'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import EmptyState from '@/components/EmptyState'
import { getBoardsOfUser } from '@/actions/getBoardsOfUser'
import Link from "next/link";



export default async function BoardsPage({ searchParams }) {

    const currentUser = await getCurrentUser()
    const boards = await getBoardsOfUser(currentUser)
    console.log("BOARDS!!!!", boards)

    if (boards.length < 1) {
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
                {
                    boards.map(board => (
                        <Link href={`/tatuajes/boards/${board.id}`}
                            key={board.id}

                        >
                            <div key={board.id}>

                                <h2>{board.title}</h2>
                            </div>
                        </Link>
                    ))

                }
            </Container>
        </>
    )
}