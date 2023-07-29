import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';


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
    const artists = await prisma.artistProfile.findMany({
        orderBy: [ // REVIEW: As we are seeding the database programatically, the createdAt is the same for almost all, so...
            { createdAt: 'asc' },
            { id: 'asc' }, // ...we need to order by id too. This should not be a problem in production, but do we need to order by id in production too?
        ],
        skip,
        take,
    })

    const nextCursor = artists.length ? artists[artists.length - 1].id : undefined

    try {


        return NextResponse.json({
            artists,
            // sorting by created date
            sort: {
                field: 'createdAt',
                order: 'desc'
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
