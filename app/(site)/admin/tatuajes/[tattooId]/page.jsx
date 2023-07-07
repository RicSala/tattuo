import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import TattooEditPageClient from "./TattooEditPageClient";


const TattooEditPage = async ({
    // currentUser //REVIEW: why not passing current user to children through the layout?
    params }) => {

    const session = await getServerSession(authOptions)
    const user = session?.user
    const { tattooId } = params
    let isNew = false

    if (!user) //TODO: redirect to login (HOW?) if user is not logged in
        return <div>Not logged in</div>

    if (tattooId === "new") isNew = true

    let tattoo = {
        title: '',
        description: '',
        imageSrc: '',
        category: '',
        artistProfileId: '',
        id: 'new',
    }

    if (!isNew) {
        tattoo = await prisma.tattoo.findUnique({
            where: {
                id: tattooId
            },
            include: {
                artistProfile: true
            }
        })
    }

    return (
        <TattooEditPageClient tattoo={tattoo} user={user} />

    )
};
export default TattooEditPage;