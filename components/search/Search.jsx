'use client'

import { BiSearch } from 'react-icons/bi';
import { useContext, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCities } from '@/libs/getCities';
import Input from '../inputs/Input';
import { BsFilter } from 'react-icons/bs';
import SearchFilterButton from './SearchFilterButton';
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
            flex
            flex-row
            justify-between
            gap-6
            my-8
        "
        >
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
            <div className=" 
             px-5 py-2 rounded-md font-bold
             w-[320px] shrink
             border-gray-200
                border
            "
            >
                London
            </div>
            <SearchFilterButton />


        </div>
    )
};

export default Search;