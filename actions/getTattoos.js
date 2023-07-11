import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import qs from "query-string";


export default async function getTattoos(searchParams) { // I would call the args "filters", because actually the function could without "searchParams" specifically

    try {

        let query = {};



        const {
            style,
            bodyPart,
            freeSearch
        } = searchParams

        const styleArray = style?.split(',')
        const styleEnums = styleArray?.map(style => {
            //replace ALL spaces with underscores
            return style.replace(/\s/g, '_')

        })

        if (styleArray && styleArray.length > 0) {
            query = {
                ...query,
                style: {
                    in: styleEnums
                }
            }
        }

        const bodyPartArray = bodyPart?.split(',')
        if (bodyPartArray && bodyPartArray.length > 0) {
            query = {
                ...query,
                bodyPart: {
                    in: bodyPartArray
                }
            }
        }

        // create a query that returns the tattoos that match the search in the title or description
        if (freeSearch) {
            query = {
                ...query,
                OR: [
                    {
                        title: {
                            contains: freeSearch,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: freeSearch,
                            mode: "insensitive"
                        }
                    },
                ]
            }
        }

        // GET ALL LISTINGS using prisma
        const listings = await prisma.tattoo.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            },
        });

        return listings;

    } catch (error) {
        console.log('error: ', error);
        return []
    }
}