import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";


export async function POST(request) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return new NextResponse.error()
    }

    if (currentUser.role !== 'ARTIST') {
        return new NextResponse.error()
    }

    // search the artistId of the current user
    const artistProfile = await prisma.artistProfile.findUnique({
        where: {
            userId: currentUser.id
        }
    })


    console.log("ARTIST PROFILE", artistProfile)

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        location,
    } = body;

    // create the listing with prisma instead of mongoose
    const listing = await prisma.tattoo.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            location,
            artistProfile: {
                connect: {
                    id: artistProfile.id
                }
            }

        }
    })


    return NextResponse.json(listing)

}
