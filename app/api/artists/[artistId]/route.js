import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";


export async function PUT(request) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
    }

    if (currentUser.role !== 'ARTIST') {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }

    // search the artistId of the current user
    const artistProfile = await prisma.artistProfile.findUnique({
        where: {
            id: currentUser.artistProfileId
        }
    })

    // check that the user that is trying to edit the artist profile is the owner of the artist profile
    if (artistProfile.userId !== currentUser.id) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }


    const body = await request.json();

    const {
        bio,
        location,
        artisticName,
    } = body

    // find and update the artist profile
    const updatedArtistProfile = await prisma.artistProfile.update({
        where: {
            id: currentUser.artistProfileId
        },
        data: {
            bio,
            location,
            artisticName: artisticName,
        }
    })

    return NextResponse.json(updatedArtistProfile)
}
