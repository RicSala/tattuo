import { getCurrentUser } from "@/actions/getCurrentUser";
import ProfilePageClient from "./ProfilePageClient";
import { getArtistById } from "@/actions/getArtistById";
import EmptyState from "@/components/EmptyState";
export const dynamic = "force-dynamic";


const ProfilePage = async ({
    // currentUser //REVIEW: why not passing current user to children through the layout?
}) => {

    const currentUser = await getCurrentUser()

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


    return (
        <>
            <ProfilePageClient artist={artist} />
        </>

    )
};
export default ProfilePage;