import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {

    const boardId = params.boardId
    console.log("boardId", boardId)

    try {
        const body = await req.json();

        console.log("body", body)

        console.log("start 🟩")

        const user = await getCurrentUser();
        console.log("user", user)
        // check if the a board with the same title and the same user already exists
        const board = await prisma.tattooBoard.findFirst({
            where: {
                id: boardId
            }
        })


        console.log("board", board)

        if (!board) {
            console.log("Board does not exist")
            return NextResponse.json({ error: 'Board does not exist' }, { status: 400 })
        }

        // Add the tattoo to the board
        console.log("Board found 🟩. Adding tattoo...")
        const updatedBoard = await prisma.tattooBoard.update({
            where: {
                id: boardId
            },
            data: {
                tattoos: {
                    connect:
                        { id: body.tattooId }
                }
            }
        })

        return NextResponse.json(updatedBoard);

    } catch (error) {
        console.log(error, 'ADD TATTTOO TO BOARD_ERROR');
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}