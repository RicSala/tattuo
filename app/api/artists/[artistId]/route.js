import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";


export async function PUT(request) {

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
            id: currentUser.artistProfileId //TODO: should not change name depending on the role...!
        }
    })

    // check that the user that is trying to edit the artist profile is the owner of the artist profile
    if (artistProfile.userId !== currentUser.id) {
        return new NextResponse.error()
    }


    const body = await request.json();

    const {
        bio,
        location,
    } = body

    // find and update the artist profile
    const updatedArtistProfile = await prisma.artistProfile.update({
        where: {
            id: currentUser.artistProfileId
        },
        data: {
            bio,
            location
        }
    })





    return NextResponse.json(updatedArtistProfile)
}
