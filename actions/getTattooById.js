import prisma from "@/libs/prismadb";


// given a tattoo id, it returns the tattoo completed data, including the artist profile
export async function getTattoosById(tattooId) {

    try {

        const tattoo = await prisma.tattoo.findUnique({
            where: {
                id: tattooId,
            },
            include: {
                artistProfile: true,
            }
        });

        if (!tattoo) {
            return null;
        }

        return tattoo

    } catch (error) {
        console.log("error", error)
        return null;
    }
}