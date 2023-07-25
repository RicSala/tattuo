import EmptyState from "@/components/ui/EmptyState";
import Image from "next/image";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getArtistById } from "@/actions/getArtistById";
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId";
import SaveButton from "@/components/ui/SaveButton";
import HeartButton from "@/components/ui/HeartButton";
import LikesCount from "@/components/ui/LikesCount";
import ArtistSocials from "@/components/artist/ArtistSocials";
import ArtistPrices from "@/components/artist/ArtistPrices";
import Heading from "@/components/ui/Heading";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
export const dynamic = "force-dynamic";


const ArtistDetailsPage = async ({ params }) => {


    // const artist = await getArtistById(params.artistId);
    // const artistTattoos = await getTattoosByArtistId(params.artistId);
    // const currentUser = await getCurrentUser();
    // instead of awaiting in series, we can await in parallel by using Promise.all
    const artistPromise = getArtistById(params.artistId);
    const artistTattoosPromise = getTattoosByArtistId(params.artistId);
    const currentUserPromise = getCurrentUser();

    const [artist, artistTattoos, currentUser] = await Promise.all([
        artistPromise, artistTattoosPromise, currentUserPromise]);

    if (!artist) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }

    console.log("ARTIST", artist)
    console.log("ARTIST TATTOOS", artistTattoos)
    console.log("CURRENT USER", currentUser)

    const numberOfTattoos = artistTattoos.length;

    return (

        <main className="profile-page">

            {/* <section className="relative block h-[500px]">
                <div className="absolute top-0 w-[110vw] h-full bg-center bg-cover ml-[-80px] mt-[-20px]" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')"
                }}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100">hello</polygon>
                    </svg>
                </div>
            </section> */}

            <section className="relative py-16 bg-background flex flex-col items-center">

                {/* HEADER */}
                <div className="flex flex-wrap justify-between">
                    <div className="w-[300px] h-[300px]">

                        <Image alt="..." src={artist.mainImage} className="shadow-xl rounded-full align-middle border-none w-[100px] h-[100px]"
                            width={100} height={100} />
                    </div>



                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{numberOfTattoos}</span><span className="text-sm text-blueGray-400">Tatuajes</span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Valoraciones</span>
                            </div>
                            <div className="lg:mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                            </div>
                        </div>
                    </div>


                    <div class="text-center mt-12">
                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                            {artist.artisticName}
                        </h3>
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                            <SaveButton listingId={artist.id} currentUser={currentUser}
                                listingType="artists" />

                        </div>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                            {artist.location}
                        </div>
                        <div className="mb-2 text-blueGray-600 mt-10 flex flex-row w-full flex-wrap">
                            {
                                artist.styles.map((style, index) => {
                                    return (
                                        <Badge key={index} color="primary">
                                            {style.label}
                                        </Badge>
                                    );
                                }
                                )
                            }
                        </div>


                    </div>
                </div>
                <div>
                    <HeartButton listingId={artist.id} currentUser={currentUser}
                        listingType="artists" />
                    <LikesCount likesArray={artist.likes} />

                </div>
                <div>
                    <div className="my-5">
                        <ArtistSocials artist={artist} />
                    </div>
                    <div className="my-5">

                        <ArtistPrices artist={artist} />
                    </div>
                </div>

                <Heading title={`Otros trabajos de ${artist.artisticName}`} />
                <TattooListingGrid listings={artistTattoos} currentUser={currentUser} listingType={'tattoos'} />
            </section>

        </main>
    )
};

export default ArtistDetailsPage;