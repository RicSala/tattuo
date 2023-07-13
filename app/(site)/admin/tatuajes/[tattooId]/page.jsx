import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import TattooEditPageClient from "./TattooEditPageClient";
import Container from "@/components/Container";


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

    const styles = await prisma.style.findMany()
    const bodyParts = await prisma.bodyPart.findMany()

    if (!isNew) {
        tattoo = await prisma.tattoo.findUnique({
            where: {
                id: tattooId
            },
            include: {
                artistProfile: true,
                style: true,
                bodyPart: true,
                tags: true,
            }
        })
    }

    return (

        <Container>
            <TattooEditPageClient tattoo={tattoo} user={user}
                styles={styles} bodyParts={bodyParts}
            />
        </Container>
    )
};
export default TattooEditPage;