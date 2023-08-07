'use client'

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsFilter } from "react-icons/bs";
import qs from "query-string";
import Button from "../ui/Button";

const SearchFilterButton = ({
    title = 'Filtros',
    options = [],
    selected = {},
    onClick,
    searchParamName
}) => {


    const menuRef = useRef(null);


    const [show, setShow] = useState(false);
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();


    const handleOnClick = (option) => {
        onClick(option.label);

    };

    const handleClickOutside = useCallback((event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShow(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);
    // End of snippet (ref added to the div below)

    const applyFilters = () => {
        setShow(false);
        if (selected.length === 0) {
            // remove the search param from the url
            const currentQuery = qs.parse(searchParams.toString());
            delete currentQuery[searchParamName];
            const url = qs.stringifyUrl({
                url: pathname,
                query: currentQuery
            },
                { skipNull: true })
            return router.push(url)
        }

        let currentQuery = {};
        if (searchParams) {
            currentQuery = qs.parse(searchParams.toString());
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                ...currentQuery,
                [searchParamName]: selected.join(','),
            }
        },
            {
                skipNull: true,
            }
        )

        router.push(url)
        router.refresh()
    }

    return (
        <div className="relative z-10"
            ref={menuRef}
        >
            <div className="  
                border-border 
                cursor-pointer 
                relative
                border 
                w-auto 
                px-5 
                py-2 
                rounded-md 
                font-bold 
                flex flex-row 
                justify-center 
                gap-2 items-center
                select-none
                flex-wrap
                
                "
                onClick={() => setShow(!show)}
            >
                <p className=''>
                    {title}
                </p>
                <BsFilter size={20} />
                {
                    selected.length > 0 && <div className="bg-gray-100 rounded-full px-2 py-1 text-xs font-bold
                    absolute right-0 top-6
                    ">
                        {selected.length}
                    </div>
                }
            </div>
            <div className="absolute mt-3">
                {show && <div className="bg-white border-gray-200 border rounded-md shadow-md">
                    {options.map((option, index) => (
                        <div key={option.label} className={clsx(`
                        px-5 
                        py-2 
                        hover:bg-gray-100 
                        cursor-pointer
                        ${selected.includes(option.label) && `bg-gray-100`}
                        ${selected.includes(option.label) && `font-bold`}
                        
                        
                        `)}


                            onClick={() => handleOnClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                    <Button
                        onClick={() => applyFilters()}
                        label="Aplicar filtros"
                    />
                </div>}


            </div>


        </div>
    )
};
export default SearchFilterButton;