import prisma from "@/libs/prismadb";


// given a board id, it returns the board completed data, including the artist profile
export async function getBoardById(boardId) {

    try {

        const board = await prisma.tattooBoard.findUnique({
            where: {
                id: boardId,
            },
            include: {
                tattoos: true,
            }
        });

        if (!board) {
            return null;
        }

        return board

    } catch (error) {

        return null;
    }
}

