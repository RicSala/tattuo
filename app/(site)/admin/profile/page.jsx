import { getCurrentUser } from "@/actions/getCurrentUser";
import ProfilePageClient from "./ProfilePageClient";
import { getArtistById } from "@/actions/getArtistById";
import EmptyState from "@/components/ui/EmptyState";
import prisma from "@/libs/prismadb";
export const dynamic = "force-dynamic";


const ProfilePage = async ({
    // currentUser //REVIEW: why not passing current user to children through the layout?
}) => {

    const currentUser = await getCurrentUser()


    // REVIEW: We should do this with the middleware, but I need a way to diff between client and artist
    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const artist = await getArtistById(currentUser.artistProfileId);

    if (!artist) {
        <EmptyState title="No estás autorizado"
            subtitle="Si eres tatuador(a), por favor escríbenos para activar tu perfil"
        />
    }

    const styles = await prisma.style.findMany()


    return (
        <>
            <ProfilePageClient artist={artist} styles={styles} />
        </>

    )
};
export default ProfilePage;