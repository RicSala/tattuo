import { getCurrentUser } from '@/actions/getCurrentUser'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import EmptyState from '@/components/EmptyState'
import Link from "next/link";
import ListingGrid from '@/components/listings/ListingGrid'



export default async function BoardsPage({ searchParams }) {

    console.log('searchParams', searchParams)

    const currentUser = await getCurrentUser()
    const boards = currentUser?.boards

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
                        boards.map(board => (
                            <div key={board.id} className="
                        bg-white
                        rounded-lg
                        p-4
                        shadow-md
                        hover:shadow-lg
                        transition-shadow
                        duration-200
                        ">

                                <Link href={`/tatuajes/boards/${board.id}`}>
                                    <div key={board.id}>
                                        <h2>{board.title}</h2>
                                    </div>
                                </Link>
                            </div>
                        ))

                    }
                </ListingGrid>
            </Container>
        </>
    )
}