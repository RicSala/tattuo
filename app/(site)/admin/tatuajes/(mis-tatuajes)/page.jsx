import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId";
import ListingGrid from "@/components/listings/ListingGrid";
import { getArtistById } from "@/actions/getArtistById";
import Button from "@/components/Button";
import Link from "next/link";
import Container from "@/components/Container";

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
            <Container>
                <div className="flex justify-end items-center py-2 mt-4">
                    <div className="bg-blue-700 p-2 rounded-md text-white">
                        <Link href="/admin/tatuajes/new">Nuevo tatuaje</Link>
                    </div>
                </div>
                <ListingGrid listings={tattoos} currentUser={currentUser}
                    actionLabel={'Editar'}
                    secondaryActionLabel={'Eliminar'}
                    listingType={'tattoos'}
                />
            </Container>
        </>
    )

};


export default MyTattoosPage;
