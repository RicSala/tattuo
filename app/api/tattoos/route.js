import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getArtistProfile from "@/actions/getArtistProfile";
import prisma from "@/libs/prismadb";



export async function GET(req) {

    const url = new URL(req.nextUrl) // Create a URL object

    const searchparamsObj = Object.fromEntries(url.searchParams)

    // requested page
    const page = parseInt(searchparamsObj.page)

    // number of items per page
    const pageSize = parseInt(searchparamsObj.pageSize)



    // number of items to skip
    const skip = parseInt(searchparamsObj.skip) || (page - 1) * pageSize

    // number of items to take
    const take = parseInt(searchparamsObj.take) || pageSize

    // get the total number of items
    const total = await prisma.artistProfile.count()

    // get the total number of pages
    const totalPages = Math.ceil(total / pageSize)

    // get the current page
    const currentPage = page

    // get the next page
    const nextPage = currentPage < totalPages ? currentPage * 1 + 1 : undefined

    // get the previous page
    const previousPage = currentPage > 1 ? currentPage * 1 - 1 : undefined

    // get the first page
    const firstPage = 1

    // get the last page
    const lastPage = totalPages

    // get the items of the current page
    const tattoos = await prisma.tattoo.findMany({
        orderBy: [ // REVIEW: As we are seeding the database programatically, the createdAt is the same for almost all, so...
            { createdAt: 'asc' },
            { id: 'asc' }, // ...we need to order by id too. This should not be a problem in production, but do we need to order by id in production too?
        ],
        skip,
        take,
    })

    const nextCursor = tattoos.length ? tattoos[tattoos.length - 1].id : undefined

    try {


        return NextResponse.json({
            data: tattoos,
            // sorting by created date
            sort: {
                field: 'createdAt',
                order: 'asc'
            },
            pagination: {
                total,
                totalPages,
                currentPage,
                nextPage,
                previousPage,
                firstPage,
                lastPage,
                nextCursor
            }
        })
    } catch (error) {
        console.log("error: ", error)
        return NextResponse.error(error)
    }
}


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

