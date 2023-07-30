'use client'

import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useRef } from "react"
import ArtistCard from "./listings/ArtistCard"
import ListingGrid from "./listings/ListingGrid"

const post = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
    { id: 4, title: 'Post 4' },
    { id: 5, title: 'Post 5' },
    { id: 6, title: 'Post 6' },
    { id: 7, title: 'Post 7' },
    { id: 8, title: 'Post 8' },
    { id: 9, title: 'Post 9' },
    { id: 10, title: 'Post 10' },

]

const realFetch = async (page = 0) => {
    const response = await axios.get(`http://localhost:3000/api/artists/infinite?pageParam=${page}`)
        .then(res => res.data)
        .catch(err => console.log(err))
    return response
}



export function InfiniteScroll({
    initialData,


}) {


    const lastPostRef = useRef(null) // we use this ref to get the last post (we set this in the map below)

    // intersectin observer hook. Uses the IntersectionObserver API to detect whether an element is visible in the viewport.
    // and returns a ref that should be passed to the element that needs to be observed and an entry object that contains
    const { ref, entry } = useIntersection({
        // The element that is used as the viewport for checking visibility of the target.
        // Must be the ACESTOR of the target. Defaults to the browser viewport if not specified or if null.
        // As I understand it, this is the element that will be used as the viewport, not the element that will be observed!
        // Usefull if you want to observe an element that is inside a scrollable container, for example.
        // root: lastPostRef.current,

        // This set of values serves to grow or shrink each side of the root element's bounding box before
        //computing intersections. Defaults to all zeros. ( e.g. "10px 20px 30px 40px")
        margin: '100px',
        // Either a single number or an array of numbers which indicate at what percentage of the target's visibility 
        // the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark,
        //you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would 
        // specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0
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
            const { pagination } = response
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
                pages: [{ data: initialData, pageParam: 1, pagination: { nextPage: 2 } }],
                //we could pass this as a prop, getting the initial data from the server
                pageParams: [1],
            }
        }
    )

    useEffect(() => {
        if (entry?.isIntersecting) { // if the last post is intersecting
            fetchNextPage()
        }
    }, [entry, fetchNextPage])


    return (
        <div>
            <h1>infinitequery</h1>
            <div>
                {data.pages.map((page, i) => (
                    <div key={i}>
                        <h2 className="
                        text-2xl
                        font-semibold
                        ">Page {page.pageParam}</h2>
                        <ListingGrid>
                            {page.data.map((element, j) => (
                                // if it's the last post of the last page, we set the ref
                                <div className={`min-h-[100px] border-2 rounded-lg p-4 mb-4 max-w-xs
                            ${i === data.pages.length - 1 && j === page.data.length - 1 ? 'bg-red-700' : 'bg-white'}
                            // border conditional too
                            ${i === data.pages.length - 1 && j === page.data.length - 1 ? 'border-red-700' : 'border-black'}
                            
                            `}
                                    key={element.id} ref={i === data.pages.length - 1 && j === page.data.length - 1 ? ref : null}>
                                    <ArtistCard data={element} />

                                </div>
                            ))}
                        </ListingGrid>

                    </div>
                ))}

                <div>
                    <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                        {isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'}
                    </button>
                </div>

            </div>
        </div>
    );

}













const mockFetch = async (page = 0) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return post.slice((page - 1) * 2, page * 2) // slices the array from one element to another. page 1, from 0 to 2, page 2, from 2 to 4, etc
}

export function InfiniteScrollMock({

}) {


    const lastPostRef = useRef(null) // we use this ref to get the last post (we set this in the map below)

    // intersectin observer hook. Uses the IntersectionObserver API to detect whether an element is visible in the viewport.
    // and returns a ref that should be passed to the element that needs to be observed and an entry object that contains
    const { ref, entry } = useIntersection({
        // The element that is used as the viewport for checking visibility of the target.
        // Must be the ACESTOR of the target. Defaults to the browser viewport if not specified or if null.
        // As I understand it, this is the element that will be used as the viewport, not the element that will be observed!
        // Usefull if you want to observe an element that is inside a scrollable container, for example.
        // root: lastPostRef.current,

        // This set of values serves to grow or shrink each side of the root element's bounding box before
        //computing intersections. Defaults to all zeros. ( e.g. "10px 20px 30px 40px")
        margin: '100px',
        // Either a single number or an array of numbers which indicate at what percentage of the target's visibility 
        // the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark,
        //you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would 
        // specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0
        threshold: 1,
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
            const response = await mockFetch(pageParam)
            return { data: response, pageParam }
        },
        {
            // This function can be set to automatically get the next cursor for infinite queries.
            // The result will also be used to determine the value of hasNextPage
            getNextPageParam: (lastPage, allPages) => {
                const morePagesExist = allPages.length * 2 < post.length;
                return morePagesExist ? allPages.length + 1 : undefined;
            },

            initialData: {
                pages: [{ data: post.slice(0, 2), pageParam: 1 }],
                //we could pass this as a prop, getting the initial data from the server
                pageParams: [1],
            }
        }
    )

    useEffect(() => {
        if (entry?.isIntersecting) { // if the last post is intersecting
            fetchNextPage()
        }
    }, [entry, fetchNextPage])


    return (
        <div>
            <h1>infinitequery</h1>
            <div>
                {data.pages.map((page, i) => (
                    <div key={i}>
                        <h2 className="
                        text-2xl
                        font-semibold
                        ">Page {page.pageParam}</h2>
                        {page.data.map((post, j) => (
                            // if it's the last post of the last page, we set the ref
                            <div className="min-h-[100px] border-2 border-black rounded-lg bg-white p-4 mb-4 max-w-xs"
                                key={post.id} ref={i === data.pages.length - 1 && j === page.data.length - 1 ? ref : null}>{post.title}</div>
                        ))}

                    </div>
                ))}

                <div>
                    <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                        {isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'}
                    </button>
                </div>

            </div>
        </div>
    );

}

// // This is the button version of the infinite scroll
// 'use client'

// import { useInfiniteQuery } from "@tanstack/react-query"

// const post = [
//     { id: 1, title: 'Post 1' },
//     { id: 2, title: 'Post 2' },
//     { id: 3, title: 'Post 3' },
//     { id: 4, title: 'Post 4' },
//     { id: 5, title: 'Post 5' },
//     { id: 6, title: 'Post 6' },
// ]



// const mockFetch = async (page = 0) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     return post.slice((page - 1) * 2, page * 2) // slices the array from one element to another. page 1, from 0 to 2, page 2, from 2 to 4, etc
// }

// export default function InfiniteScroll({

// }) {
//     const {
//         data, // the data of the current page
//         fetchNextPage, // fetches the next page
//         isFetchingNextPage, // is the next page currently being fetched?
//         isFetchingPreviousPage, // is the previous page currently being fetched?
//         hasNextPage, // is there a next page?
//         hasPreviousPage, // is there a previous page?
//         isLoading, // is the first page currently being fetched?
//     } = useInfiniteQuery(
//         ['posts'], // query key to use for caching. Why is this an array?
//         async ({ pageParam = 1 }) => //mockFetch(pageParam), // query function. receives a queryFunctionContext object: https://tanstack.com/query/v4/docs/react/guides/query-functions#queryfunctioncontext
//         {
//             const response = await mockFetch(pageParam)
//             return response
//         },
//         {
//             // This function can be set to automatically get the next cursor for infinite queries.
//             // The result will also be used to determine the value of hasNextPage
//             getNextPageParam: (lastPage, allPages) => {
//                 const morePagesExist = allPages.length * 2 < post.length;
//                 return morePagesExist ? allPages.length + 1 : undefined;
//             },

//             initialData: {
//                 pages: [post.slice(0, 2)], //we could pass this as a prop, getting the initial data from the server
//                 pageParams: [1],
//             }
//         }
//     )



//     return (
//         <div>
//             <h1>infinitequery</h1>
//             <div>
//                 {data.pages.map((page, i) => (
//                     <div key={i}>
//                         {page.map((post) => (
//                             <div key={post.id}>{post.title}</div>
//                         ))}

//                     </div>
//                 ))}

//                 <div>
//                     <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
//                         {isFetchingNextPage
//                             ? 'Loading more...'
//                             : hasNextPage
//                                 ? 'Load More'
//                                 : 'Nothing more to load'}
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );

// }
