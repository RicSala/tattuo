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
        tags,
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
            },
            artistProfile: {
                connect: { id: artistProfile.id }
            },
            tags: {
                create: tags.map(tag => ({
                    tag: { connect: { id: tag.id } }
                }))

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
        tags,
    } = body;

    // fetch the current tattoo with tags
    const currentTattoo = await prisma.tattoo.findUnique({
        where: {
            id: tattooId
        },
        include: {
            tags: {
                include: {
                    tag: true
                }
            }
        }
    });

    // Map current tags to their IDs
    const currentTagIds = currentTattoo.tags.map(t => t.tag.id);


    // Identify tags to be added and removed
    const tagsToAdd = tags.filter(tag => !currentTagIds.includes(tag.id));
    const tagsToRemove = currentTattoo.tags.filter(taggedTattoo => !tags.some(tag => tag.id === taggedTattoo.tag.id));



    // Build the Prisma update query
    const updateQuery = {
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
            },
            artistProfile: {
                connect: { id: artistProfile.id }
            },
        }
    };

    // Add connect operations for tags to be added
    if (tagsToAdd.length > 0) {
        updateQuery.data.tags = {
            create: tagsToAdd.map(tag => ({
                tag: {
                    connect: { id: tag.id }
                }
            }))
        };
    }

    // Build the operations to execute in the transaction
    const operations = [
        prisma.tattoo.update(updateQuery),
        ...tagsToRemove.map(taggedTattoo => prisma.taggedTattoo.delete({
            where: {
                id: taggedTattoo.id
            }
        })),
    ];

    // Execute the transaction
    const transactionResult = await prisma.$transaction(operations);


    return NextResponse.json(transactionResult[0])

}

