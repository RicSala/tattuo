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
            freeSearch,

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

        if (city) {
            query.location = city
        }

        // create a query that returns the tattoos that match the search in the title or description
        if (freeSearch) {
            query = {
                ...query,
                OR: [
                    {
                        artisticName: {
                            contains: freeSearch,
                            mode: "insensitive"
                        }
                    },
                    {
                        bio: {
                            contains: freeSearch,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        }


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