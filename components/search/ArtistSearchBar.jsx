'use client'

import { useRouter, useSearchParams } from "next/navigation";
import SearchFilterButton from "./SearchFilterButton";
import qs from 'query-string';
import { useCallback } from "react";

const ArtistSearchBar = ({
    // props
}) => {

    let currentQuery = {};

    const router = useRouter();

    const searchParams = useSearchParams();

    if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
    }


    console.log("CURRENT QUERY", currentQuery);

    const onSubmit = useCallback(() => {
        let currentQuery = {};
        if (searchParams) {
            currentQuery = qs.parse(searchParams.toString());
        }

        const updatedQuery = {
            ...currentQuery,
        };

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        },
            {
                skipNull: true,
            }
        );
        router.push(url);
    }, [router, searchParams]);

    return (
        <div className="
        flex flex-row justify-between 
        ">
            <div className="flex flex-row justify-start flex-1">
                <input
                    className=" flex-1
                px-5 py-2 rounded-md font-bold
                border-gray-200
                border
                "
                    name="location"
                    type="text"
                    placeholder="Cualquier sitio"
                />
            </div>
            <SearchFilterButton title="Por temática" />
            <SearchFilterButton title="Por estilo" />
        </div>
    )
};
export default ArtistSearchBar;