import { BsFilter } from "react-icons/bs";

const SearchFilterButton = ({
    title = 'Filtros',
}) => {
    return (
        <div className="  border-gray-200 cursor-pointer
    border w-auto px-5 py-2 rounded-md font-bold flex flex-row justify-between gap-2 items-center
    select-none
    "
        >
            <p className='hidden sm:block'>
                {title}
            </p>
            <BsFilter size={20} />
        </div>
    )
};
export default SearchFilterButton;