'use client'

import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import React, { useEffect, useRef } from "react"

export function InfiniteScrollReal({
    initialData,
    sizePerPage,
    endpoint,
    keyProp,
    Component,
    currentUser,
}) {


    const realFetch = async (page = 0) => {
        const response = await axios.get(`${endpoint}?page=${page}&pageSize=${sizePerPage}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return response
    }

    const { ref, entry } = useIntersection({

        margin: '100px',

        threshold: 0,
    })



    const {
        data, // the data of the current page
        fetchNextPage, // fetches the next page
        isFetchingNextPage, // is the next page currently being fetched?
        isFetchingPreviousPage, // is the previous page currently being fetched?
        hasNextPage, // is there a next page?
        hasPreviousPage, // is there a previous page?
        isLoading, // is the first page currently being fetched?
    } = useInfiniteQuery(
        ['posts'], // query key to use for caching. Why is this an array?
        async ({ pageParam = 1 }) => //mockFetch(pageParam), // query function. receives a queryFunctionContext object: https://tanstack.com/query/v4/docs/react/guides/query-functions#queryfunctioncontext
        {
            const response = await realFetch(pageParam)
            console.log("response: ", response)
            const { pagination } = response
            console.log("pagination: ", pagination)
            return { data: response.artists, pageParam, pagination }
        },
        {
            // This function can be set to automatically get the next cursor for infinite queries.
            // The result will also be used to determine the value of hasNextPage
            getNextPageParam: (lastPage, allPages) => {
                console.log("lastPage: ", lastPage)
                return lastPage.pagination.nextPage
            },

            initialData: {
                // pages: [{ data: initialData, pageParam: 1, pagination: { nextPage: (initialData.length / 10 + 1) } }],
                pages:
                    // create an array with objects of: data: the slice of initial data from (sizePerPage*index) to (sizePerPage * index +1), pageParam: index + 1, pagination: { nextPage: index + 2 }
                    Array.from({ length: initialData.length / sizePerPage }, (_, index) => ({
                        data: initialData.slice(sizePerPage * index, sizePerPage * index + sizePerPage),
                        pageParam: index + 1,
                        pagination: { nextPage: index + 2 }
                    })),
                //we could pass this as a prop, getting the initial data from the server
                pageParams: [initialData.length / 10],
            },
            staleTime: Infinity, // don't refetch data

        }
    )

    const array = Array.from({ length: Math.ceil(initialData.length / sizePerPage) }, (_, index) => ({
        data: initialData.slice(sizePerPage * index, sizePerPage * index + sizePerPage),
        pageParam: index + 1,
        pagination: { nextPage: index + 2 }
    }))

    // console.log("initialData 🟦: ", initialData)
    // console.log("sizePerPage 🟦: ", sizePerPage)
    // console.log("pages", data.pages)
    // console.log("ARRAY 🟨: ", array)

    useEffect(() => {
        if (entry?.isIntersecting) { // if the last post is intersecting
            fetchNextPage()
        }
    }, [entry, fetchNextPage])

    return (
        data.pages.map((page, i) => (


            page.data.map((element, j) => {
                // Create a new props object with the dynamic key and the data
                const childProps = { [keyProp]: element };
                // add the currrnt user to the props
                childProps.currentUser = currentUser;

                return (
                    // if it's the last post of the last page, we set the ref
                    <div key={element.id} ref={i === data.pages.length - 1 && j === page.data.length - 1 ? ref : null}
                        className="inline"
                    >
                        <Component {...childProps} />

                    </div>

                )
            })
        ))
    );

}


