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
import Badge from "@/components/ui/Badge";
import ListingGrid from "@/components/listings/ListingGrid";
import TattooCard from "@/components/listings/TattooCard";
import { BsArrowDownRightCircle, BsBack, BsMenuDown } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { BiDownArrow, BiDownArrowAlt } from "react-icons/bi";
import { Separator } from "@/components/ui/Separator";
import Container from "@/components/ui/Container";
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

    const numberOfTattoos = artistTattoos.length;

    return (

        <main className="flex flex-row justify-center flex-wrap gap-4">

            <section className="w-full sm:w-[280px]">
                <div className="flex flex-col bg-secondary/50 rounded-lg p-5 gap-2">
                    <div className="flex flex-row justify-between">
                        <BsBack />
                        <IoMdMore />
                    </div>
                    <div className="flex justify-center items-center">
                        <Avatar user={artist} isArtist={true} />
                        <div className="flex flex-col pl-2">
                            <p className="font-bold">{artist.artisticName}</p>
                            <p className="text-muted-foreground">Disponible</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button label={"Contactar"} className="w-[50%]" />
                        <Button label={"Guardar"} className="w-[50%]" outline />
                    </div>
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p>Más información</p>
                        <BiDownArrowAlt />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="font-bold">Bio</p>
                            <p>{artist.bio}</p>
                        </div>
                        <Separator />
                        <div>
                            <p className="font-bold mb-2">Redes Sociales</p>
                            <ArtistSocials artist={artist} />
                        </div>
                        <Separator />
                        <div>

                            <p className="font-bold mb-2">Estilos</p>
                            <div className="">

                                {
                                    artist.styles.map((style, index) => {
                                        return (
                                            <Badge key={index} color="primary" className="inline">
                                                {style.label}
                                            </Badge>
                                        );
                                    }
                                    )
                                }
                            </div>
                        </div>


                    </div>

                </div>
            </section>

            <section className="flex-grow">
                <Container>
                    <Heading title={`Sus trabajos`} />
                    <ListingGrid>
                        {
                            artistTattoos.map((tattoo) => (
                                <TattooCard data={tattoo} currentUser={currentUser} key={tattoo.id} />
                            )
                            )}
                    </ListingGrid>
                </Container>
            </section>

        </main>
    )
};

export default ArtistDetailsPage;