import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import getArtistProfile from "@/lib/getArtistProfile";


export async function POST(request) {

    const { errorResponse, currentUser, artistProfile } = await getArtistProfile(request);

    if (errorResponse) { return errorResponse; }



    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        location,
        tattooId,
    } = body;

    // create or update the listing
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


    // create the listing with prisma instead of mongoose
    // const listing = await prisma.tattoo.create({
    //     data: {
    //         title,
    //         description,
    //         imageSrc,
    //         category,
    //         location,
    //         artistProfile: {
    //             connect: {
    //                 id: artistProfile.id
    //             }
    //         }

    //     }
    // })


    return NextResponse.json(listing)

}

// same as POST
export async function PUT(request) {

    const { errorResponse, currentUser, artistProfile } = await getArtistProfile(request);

    if (errorResponse) { return errorResponse; }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        location,
        tattooId,
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
            artistProfile: {
                connect: {
                    id: artistProfile.id
                }
            }

        }

    })

    return NextResponse.json(listing)

}

