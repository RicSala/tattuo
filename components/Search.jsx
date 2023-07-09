'use client'

import { BiSearch } from 'react-icons/bi';
import { useContext, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCities } from '@/libs/getCities';
// import { differenceInDays } from 'date-fns';

const Search = () => {

    // const { onOpenSearchModal } = useContext(UiContext);
    const params = useSearchParams();
    const cities = getCities();

    const location = params.get('city') || 'Cualquier sitio';
    const startDate = params.get('startDate');
    const endDate = params.get('endDate');
    const style = params.get('style') || 'Cualquier estilo';


    // const locationLabel = useMemo(() => {
    //     if (location === 'Cualquier sitio') {
    //         return 'Cualquier sitio'
    //     }

    //     const country = countries.getByValue(location);
    //     return country.label
    // }
    //     , [location]);


    // const duration = useMemo(() => {
    //     if (!startDate || !endDate) {
    //         return 'Cualquier fecha'
    //     }

    //     const start = new Date(startDate);
    //     const end = new Date(endDate);

    //     let diff = differenceInDays(end, start);

    //     if (diff === 0) { diff = 1 }

    //     return `${diff} noche${diff > 1 ? 's' : ''}`

    // }, [startDate, endDate]);


    return (
        <div
            onClick={() => { }}
            className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        "
        >
            {/* This div stablishes how the inner elements are distributed */}
            <div className="
            flex
            flex-row
            items-center
            justify-between
            ">

                <div className="
                text-sm
                font-semibold
                px-6
                ">
                    {location}
                </div>

                {/* <div className="
                hidden
                sm:block
                text-sm
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                ">
                    {duration}
                </div> */}

                <div
                    className="
                    text-sm
                    pl-6
                    pr-2
                    text-gray-600
                    flex
                    flex-row
                    items-center
                    gap-3
                    ">
                    <div className="hidden sm:block">
                        {style}

                    </div>
                    <div className="
                      p-2
                      bg-rose-500
                      rounded-full
                      text-white  
                    ">
                        <BiSearch size={15} />



                    </div>
                </div>



            </div>


        </div>
    )
};

export default Search;