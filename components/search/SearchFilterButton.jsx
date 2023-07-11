'use client'

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import qs from "query-string";

const SearchFilterButton = ({
    title = 'Filtros',
    options = [],
    selected = {},
    onClick,
    searchParamName
}) => {


    const [show, setShow] = useState(false);
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();


    const handleOnClick = (option) => {
        console.log('options: ', options);
        console.log('click');
        onClick(option.label);
        console.log('clicked on option: ', option.value);

    };

    const applyFilters = () => {
        setShow(false);
        if (selected.length === 0) {
            console.log('selected.length === 0');
            return router.push(pathname)
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
        <div className="relative z-10">
            <div className="  border-gray-200 cursor-pointer relative
    border w-auto px-5 py-2 rounded-md font-bold flex flex-row juify-between gap-2 items-center
    select-none"
                onClick={() => setShow(!show)}
            >
                <p className='hidden sm:block'>
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
                    <button className="bg-white border-gray-200 border rounded-md shadow-md px-5 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => applyFilters()}
                    >
                        Aplicar filtros
                    </button>
                </div>}


            </div>


        </div>
    )
};
export default SearchFilterButton;