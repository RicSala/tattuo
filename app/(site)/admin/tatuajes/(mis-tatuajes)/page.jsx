import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId";
import TattooListingGrid from "@/components/listings/TattooListingGrid";
import Link from "next/link";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

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

        <TattooListingGrid listings={tattoos} currentUser={currentUser}
            actionLabel={'Editar'}
            secondaryActionLabel={'Eliminar'}
            listingType={'tattoos'}
            canLike={false}
            canSave={false}
        />
    )

};


export default MyTattoosPage;
