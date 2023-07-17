import { getTattoosById } from "@/actions/getTattooById";
import EmptyState from "@/components/EmptyState";
import TattooDetailsPageClient from "./TattooDetailsPageClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getSimilarTattoos from "@/actions/getSimilarTattoos";
import { getBoardsOfUser } from "@/actions/getBoardsOfUser";

const TattooDetailsPage = async ({ params }) => {



    // TODO: Intercepting routes to show in a modal
    // TODO: Head for SEO (title, description, etc)
    // TODO: rss feed (https://nextjs.org/docs/app/building-your-application/routing/router-handlers#non-ui-responses)
    // REVIEW: what is turbopack?
    const tattoo = await getTattoosById(params.tattooId);
    const similarTattoos = await getSimilarTattoos(tattoo);
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
                similarTattoos={similarTattoos}
            />

        </>
    )
};

export default TattooDetailsPage;