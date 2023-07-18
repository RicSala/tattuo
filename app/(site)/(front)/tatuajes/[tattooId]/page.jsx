import { getTattoosById } from "@/actions/getTattooById";
import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getSimilarTattoos from "@/actions/getSimilarTattoos";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import TattooCard from "@/components/listings/TattooCard";
import ArtistSmallCard from "@/components/artist/ArtistSmallCard";
import ShareButtons from "@/components/ShareButtons";
import TattooListingGrid from "@/components/listings/TattooListingGrid";

const TattooDetailsPage = async ({ params }) => {



    // TODO: Intercepting routes to show in a modal
    // TODO: Head for SEO (title, description, etc)
    // TODO: rss feed (https://nextjs.org/docs/app/building-your-application/routing/router-handlers#non-ui-responses)
    // REVIEW: what is turbopack?

    // const tattoo = await getTattoosById(params.tattooId);
    // const similarTattoos = await getSimilarTattoos(tattoo);
    // const currentUser = await getCurrentUser();
    // let's change the preview to a promise.all to get all the data at once in parallel
    const tattooPromise = getTattoosById(params.tattooId);
    const currentUserPromise = getCurrentUser();
    const [tattoo, currentUser] = await Promise.all([tattooPromise, currentUserPromise])

    const similarTattoos = await getSimilarTattoos(tattoo);

    if (!tattoo) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }

    const age = Math.floor((new Date() - new Date(tattoo.createdAt)) / (1000 * 60 * 60 * 24));


    return (

        <Container>
            <Heading title={tattoo.title} />
            <TattooCard data={tattoo}
                currentUser={currentUser}
                listingType="tattoos"
            />
            {
                <p> {
                    age === 0 ? 'Publicado hoy' :

                        age > 1 ? `Publicado hace ${age} días` :
                            `Publicado ayer`
                } </p>
            }
            <div>
                {/* { `${tattoo.savesCount} saves}`} */}
                {
                    tattoo.likes?.length > 0 && (
                        <div className="flex flex-row items-center gap-1">
                            {tattoo.likes?.length} likes
                        </div>)


                }
            </div>
            <ShareButtons url={`http://localhost:3000/tatuajes/${tattoo.id}`} />
            <ArtistSmallCard artist={tattoo.artistProfile} />

            <h2 className="mt-20 font-bold text-lg">También te pueden gustar...</h2>
            <TattooListingGrid
                listings={similarTattoos}
                currentUser={currentUser}
                listingType="tattoos"
            />

        </Container>
    )
};

export default TattooDetailsPage;