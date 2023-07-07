import prisma from "@/libs/prismadb";



// given a user, it returns an array of tattoo ids that the user has saved as favorite
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
            return [];
        }

        return favoriteIds.map(favoriteId => favoriteId.tattooId);
    } catch (error) {
        return [];
    }

}

