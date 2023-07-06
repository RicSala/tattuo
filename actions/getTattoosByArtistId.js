import prisma from "@/libs/prismadb";



export async function getTattoosByArtistId(artistId) {
    try {

        const tattoos = await prisma.tattoo.findMany({
            where: {
                artistProfileId: artistId,
            }
        });



        if (!tattoos) {
            return null;
        }

        return tattoos

    } catch (error) {
        console.log("error", error)
        return null;
    }
}