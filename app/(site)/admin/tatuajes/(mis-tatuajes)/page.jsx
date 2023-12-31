import EmptyState from "@/components/ui/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
import HeadingWithButton from "@/components/ui/HeadingWithButton";
import ListingGrid from "@/components/listings/ListingGrid";
import TattooCard from "@/components/listings/TattooCard";

const MyTattoosPage = async ({ params }) => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    if (!currentUser.artistProfileId) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate como tatuador" />
        )
    }

    const tattoos = await getTattoosByArtistId(currentUser.artistProfileId);

    if (tattoos.length < 1) {
        return (
            <EmptyState title="No has publicado ningún tatuaje"
                subtitle="Publica tatuajes para que tus clientes puedan verlos"
                actionLabel="Publicar tatuaje"
                actionUrl="/admin/tatuajes/new"
            />
        )
    }

    return (

        <>

            <HeadingWithButton title={'Tus tatuajes publicados'} actionLabel={'Publicar tatuaje'} buttonUrl={'/admin/tatuajes/new'} />

            <ListingGrid>
                {
                    tattoos.map(
                        (tattoo) => (
                            <TattooCard
                                data={tattoo}
                                currentUser={currentUser}
                                key={tattoo.id}
                                actionLabel={"Editar"}
                                onAction={"Editar"}
                                secondaryActionLabel={"Eliminar"}
                                onSecondaryAction={"Eliminar"}
                                actionId={tattoo.id}
                                canLike={false}
                                canSave={false}
                            />)
                    )
                }
            </ListingGrid>
        </>
    )

};


export default MyTattoosPage;
