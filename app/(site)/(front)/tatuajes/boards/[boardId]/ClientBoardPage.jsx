'use client'

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingGrid from "@/components/listings/ListingGrid";
import TattooCard from "@/components/listings/TattooCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const NewClientBoardPage = ({
    board,
    tattoos,
    currentUser
}) => {


    const router = useRouter();

    const deleteFromBoard = async (tattooId) => {
        toast.success('Tattoo removed from board')

        const response = await axios.delete(`/api/boards/${board.id}/tattoos/`, {
            data: {
                tattooId: tattooId
            }
        })
            .then(res => {
                router.refresh()
                return res.data
            })
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
                            onAction={deleteFromBoard}
                            actionId={tattoo.id}
                        />
                    ))
                }

            </ListingGrid>
        </Container>


    )
};
export default NewClientBoardPage;