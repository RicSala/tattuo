import { getCurrentUser } from "@/actions/getCurrentUser";
import ProfilePageClient from "./ProfilePageClient";
import { getArtistById } from "@/actions/getArtistById";

const ProfilePage = async ({
    // currentUser //REVIEW: why not passing current user to children through the layout?
}) => {

    const user = await getCurrentUser();
    const artist = await getArtistById(user.artistProfileId);

    if (!user) //TODO: redirect to login (HOW?) if user is not logged in
        return <div>Not logged in</div>

    return (
        <>
            <p>
                Profile Page
            </p>

            <p>
                {
                    JSON.stringify(user)
                }
            </p>

            <ProfilePageClient artist={artist} />

        </>

    )
};
export default ProfilePage;