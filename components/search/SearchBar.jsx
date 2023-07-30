'use client'

import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchFilterButton from './SearchFilterButton';
import qs from 'query-string';

const Search = ({
    filtro1 = {
        label: 'Estilos',
        value: 'style',
        options: []
    },
    filtro2 = {
        label: 'Parte del cuerpo',
        value: 'bodyPart',
        options: []
    }
}) => {

    const searchParams = useSearchParams();
    const [selectedFiltro1, setSelectedFiltro1] = useState([]);
    const [selectedFiltro2, setSelectedFiltro2] = useState([]);
    const [freeSearch, setFreeSearch] = useState('');
    const pathname = usePathname()
    const router = useRouter();

    useEffect(() => {

        const paramsFiltro1 = qs.parse(searchParams.toString())[filtro1.value]
        if (paramsFiltro1) {
            setSelectedFiltro1(paramsFiltro1.split(','))
        }

        const paramsFiltro2 = qs.parse(searchParams.toString())[filtro2.value]
        if (paramsFiltro2) {
            setSelectedFiltro2(paramsFiltro2.split(','))
        }

        const freeSearchParams = qs.parse(searchParams.toString()).freeSearch
        if (freeSearchParams) {
            setFreeSearch(freeSearchParams)
        }
    }, [filtro1.value, filtro2.value, searchParams])


    const toggleSelectedFiltro1 = (toggledSelectedFiltro1) => {
        if (selectedFiltro1.includes(toggledSelectedFiltro1)) {
            setSelectedFiltro1(selectedFiltro1.filter(selectedFiltro1Item => selectedFiltro1Item !== toggledSelectedFiltro1));
        } else {
            setSelectedFiltro1([...selectedFiltro1, toggledSelectedFiltro1]);
        }
    };

    const toggleSelectedFiltro2 = (toggledSelectedFiltro2) => {
        if (selectedFiltro2.includes(toggledSelectedFiltro2)) {
            setSelectedFiltro2(selectedFiltro2.filter(SelectedFiltro2Item => SelectedFiltro2Item !== toggledSelectedFiltro2));
        } else {
            setSelectedFiltro2([...selectedFiltro2, toggledSelectedFiltro2]);
        }
    };

    const onFreeSearchClick = () => {
        if (freeSearch === '') {
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
                freeSearch: freeSearch,
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
        <div
            onClick={() => { }}
            className="
            relative
            flex
            flex-row
            justify-between
            gap-6
            my-8
            flex-wrap
        "
        >
            <div className='
            flex 
            flex-row 
            flex-1
            gap-2
            items-center
            
            '>
                <input
                    className='
                    block
                    flex-1
                    basis-30
                    max-w-[400px]
                    px-5
                    py-2
                    rounded-md
                    font-bold
                    border-gray-200
                items-start
                border'
                    name="location"
                    type="text"
                    placeholder="Búsqueda libre"
                    value={freeSearch}
                    onChange={(e) => {
                        setFreeSearch(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onFreeSearchClick()
                        }
                    }}
                />
                <button className='
                bg-gray-200
                p-2
                rounded-md
                flex flex-row
                flex-nowrap
                gap-1
                items-center
                '
                    onClick={() => {
                        onFreeSearchClick()
                    }}
                >
                    Buscar <BiSearch className="inline" size={20} />
                </button>

            </div>
            <div className='flex flex-row gap-2'>
                <SearchFilterButton title={filtro1.label} options={filtro1.options} onClick={toggleSelectedFiltro1} selected={selectedFiltro1} searchParamName={filtro1.value} />
                <SearchFilterButton title={filtro2.label} options={filtro2.options} onClick={toggleSelectedFiltro2} selected={selectedFiltro2} searchParamName={filtro2.value} />
            </div>

        </div>
    )
};

export default Search;