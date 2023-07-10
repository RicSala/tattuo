import prisma from "@/libs/prismadb";


export async function getArtist(searchParams) { // I would call the args "filters", because actually the function could without "searchParams" specifically

    try {

        const {
            userId,
            // userId = null,
            styles,
            artist_name,
            city,
            content,

        } = searchParams;


        // // we are building the query object for prisma
        let query = {};

        // // conditionally add properties to the query object...

        if (userId) {
            query.userId = userId
        }

        if (styles) {
            query.styles = { hasSome: styles };
        }



        // if (category) {
        //     query.category = category
        // }



        // if (roomCount) {
        //     query.roomCount =
        //     {                       // this is how you add a condition to a query in prisma
        //         gte: +roomCount // gte = greater than or equal to & +roomCount converts string to number
        //     }
        // }



        // if (bathRoomCount) { // TODO: fix capitalization
        //     query.bathroomCount = {
        //         gte: +bathRoomCount
        //     }
        // }



        // if (guestCount) {
        //     query.guestCount = {
        //         gte: +guestCount
        //     }
        // }



        // if (locationValue) {
        //     query.locationValue = locationValue
        // }



        // if (startDate && endDate) {
        //     console.log("startDate", startDate)
        //     console.log("endDate", endDate)
        //     query.NOT = {
        //         reservations: {
        //             some: {
        //                 OR: [
        //                     {   // if the start date is between the start and end date of any reservation
        //                         endDate: { gte: startDate },
        //                         startDate: { lte: startDate }
        //                     },
        //                     {   // if the end date is between the start and end date of any reservation
        //                         endDate: { gte: endDate },
        //                         startDate: { lte: endDate }
        //                     },
        //                 ] // then exclude that listing from the results, because it is not available
        //             }
        //         }
        //     }
        // }



        // GET ALL LISTINGS using prisma
        const artists = await prisma.artistProfile.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            },
        });

        return artists;

    } catch (error) {
        throw new Error(error); // TODO: where does this error go?
    }
}