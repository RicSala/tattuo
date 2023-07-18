'use client'

import axios from 'axios';
import AsyncSelect from 'react-select/async';


const getOptions = async (inputValue, resources) => {
    try {
        const res = await axios.get(`/api/${resources}?s=${inputValue}`)
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};


const CustomAsyncSelect = ({
    placeholder = "Selecciona una opción",
    isMulti = false,
    isSearchable = true,
    field: {
        value,
        onChange,
        onBlur,
    },
    resources,
    noOptionsMessage = () => "Teclea para buscar",
}) => {
    return (
        <AsyncSelect
            cacheOptions
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isSearchable={isSearchable}
            // defaultOptions={defaultOptions}
            loadOptions={(inputValue) => getOptions(inputValue, resources)}
            placeholder={placeholder}
            isMulti={isMulti}
            noOptionsMessage={noOptionsMessage}



        // loadOptions={async (inputValue, callback) => {
        //     console.log("INPUT VALUE", inputValue);
        //     const options = await getOptions(inputValue)

        //     callback(options);
        // }}

        />
    )
};
export default CustomAsyncSelect;