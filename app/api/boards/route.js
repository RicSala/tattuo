import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req) {

    try {
        const body = await req.json();

        console.log("body", body)

        console.log("start 🟩")

        const user = await getCurrentUser();
        console.log("user", user)
        // check if the a board with the same title and the same user already exists
        const board = await prisma.tattooBoard.findFirst({
            where: {
                title: body.title,
                userId: user.id
            }
        })


        console.log("board", board)

        if (board) {
            console.log("Board Already exist")
            return NextResponse.json({ error: 'Board already exists' }, { status: 400 })
        }

        // TODO: User -> user
        console.log("Board NOT found 🟩. Creating...")
        const newBoard = await prisma.tattooBoard.create({
            data: {
                title: body.title,
                user: {
                    connect:
                        { id: user.id }
                }
            }
        })

        return NextResponse.json(newBoard);

    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}