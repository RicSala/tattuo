import { getTattoosById } from "@/actions/getTattooById";
import EmptyState from "@/components/ui/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getSimilarTattoos from "@/actions/getSimilarTattoos";
import Heading from "@/components/ui/Heading";
import Container from "@/components/ui/Container";
import TattooCard from "@/components/listings/TattooCard";
import ArtistSmallCard from "@/components/artist/ArtistSmallCard";
import ShareButtons from "@/components/ui/ShareButtons";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
import { Separator } from "@/components/ui/Separator";

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
            <div className="
            flex 
            flex-row 
            items-stretch
            border-border 
            rounded-lg
            border-2
            justify-center
            max-w-5xl
            mx-auto
            ">
                <div className="flex-grow basis-96">
                    <TattooCard data={tattoo}
                        currentUser={currentUser}
                        listingType="tattoos"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="px-4 pt-4">
                            <Heading title={tattoo.title} />
                        </div>
                        <Separator />
                        <div className="px-4 pt-4">
                            <div
                                className="font-bold"
                            >Sobre la pieza: </div>
                            <p className="">{tattoo.description}</p>
                        </div>
                        <div>
                            {/* tags separated by commas */}
                            <div className="px-4 pt-4">
                                <div
                                    className="font-bold"
                                >Tags: </div>
                                <p className="">{tattoo.tags?.join(', ')}</p>
                            </div>
                        </div>
                        <div className="p-4 flex flex-row justify-between">

                            {
                                <p> {
                                    age === 0 ? 'Publicado hoy' :

                                        age > 1 ? `Publicado hace ${age} días` :
                                            `Publicado ayer`
                                } </p>
                            }
                            {
                                tattoo.likes?.length > 0 && (
                                    <div className="flex flex-row items-center gap-1">
                                        {tattoo.likes?.length} likes
                                    </div>)


                            }
                        </div>

                    </div>
                    <ShareButtons url={`http://localhost:3000/tatuajes/${tattoo.id}`} />
                    <ArtistSmallCard artist={tattoo.artistProfile} />
                </div>
            </div>


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