import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';


export async function GET(req) {

    console.log("GET OF ENDPOINT: /artists/infinite")
    console.log("NEXTURL: ", req.nextUrl)

    const url = new URL(req.nextUrl) // Create a URL object

    const searchparamsObj = Object.fromEntries(url.searchParams)

    // requested page
    const { pageParam = 1 } = searchparamsObj

    // number of items per page
    const { pageSize = 10 } = searchparamsObj

    // number of items to skip
    const { skip = (pageParam - 1) * pageSize } = searchparamsObj

    // number of items to take
    const { take = pageSize } = searchparamsObj

    // get the total number of items
    const total = await prisma.artistProfile.count()

    // get the total number of pages
    const totalPages = Math.ceil(total / pageSize)

    // get the current page
    const currentPage = pageParam

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
        skip,
        take
    })

    // get the next cursor
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
