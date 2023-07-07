import { getTattoosById } from "@/actions/getTattooById";
import EmptyState from "@/components/EmptyState";
import TattooDetailsPageClient from "./TattooDetailsPageClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

const TattooDetailsPage = async ({ params }) => {


    console.log("params", params)
    const tattoo = await getTattoosById(params.tattooId);
    const currentUser = await getCurrentUser();

    if (!tattoo) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }

    return (

        <>
            <TattooDetailsPageClient
                tattoo={tattoo}
                currentUser={currentUser}
            />

        </>
    )
};

export default TattooDetailsPage;