import prisma from "@/libs/prismadb";



// using the session object, it gets the current user from the database
export async function getFavoriteIdsOfUser(user) {

    try {

        if (!user) {
            return null;
        }

        const favoriteIds = await prisma.savedTattoo.findMany({
            where: {
                userId: user.id
            },
            select: {
                tattooId: true
            }
        });

        if (!favoriteIds) {
            return null;
        }

        return favoriteIds.map(favoriteId => favoriteId.tattooId);
    } catch (error) {
        return null;
    }

}

