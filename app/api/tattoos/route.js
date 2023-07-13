import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getArtistProfile from "@/libs/getArtistProfile";
import prisma from "@/libs/prismadb";


export async function POST(request) {

    const { errorResponse, currentUser, artistProfile } = await getArtistProfile(request);

    if (errorResponse) { return errorResponse; }



    const body = await request.json();

    const {
        tattooId,
        title,
        description,
        imageSrc,
        category,
        location,
        style,
        bodyPart,
    } = body;

    // create or update the listing
    const listing = await prisma.tattoo.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            location,
            style: {
                connect: { id: style.id },
            },
            bodyPart: {
                connect: { id: bodyPart.id }
            }
        }

    })



    return NextResponse.json(listing)

}

// same as POST
export async function PUT(request) {

    const { errorResponse, currentUser, artistProfile } = await getArtistProfile(request);

    if (errorResponse) { return errorResponse; }

    const body = await request.json();

    const {
        tattooId,
        title,
        description,
        imageSrc,
        category,
        location,
        style,
        bodyPart,
    } = body;

    // create or update the listing
    const listing = await prisma.tattoo.update({
        where: {
            id: tattooId
        },
        data: {
            title,
            description,
            imageSrc,
            category,
            location,
            style: {
                connect: { id: style.id },
            },
            bodyPart: {
                connect: { id: bodyPart.id }
            }
        }

    })

    return NextResponse.json(listing)

}

