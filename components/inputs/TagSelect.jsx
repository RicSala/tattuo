import axios from 'axios';
import React from 'react';

import AsyncCreatableSelect from 'react-select/async-creatable';

const colourOptions = [
    { label: 'red', value: 'red' },
    { label: 'blue', value: 'blue' },
    { label: 'yellow', value: 'yellow' },
    { label: 'green', value: 'green' },
    { label: 'purple', value: 'purple' },
    { label: 'black', value: 'black' },
    { label: 'white', value: 'white' },
    { label: 'orange', value: 'orange' },
    { label: 'brown', value: 'brown' },
];

const filteredOptions = async (inputValue) => {

    const res = await axios.get(`/api/tags?s=${inputValue}`)

    console.log("RES", res)

    const tags = res.data

    console.log("HERE TAGS", tags)

    return tags
};

const promiseOptions = (inputValue) => {

    console.log("INPUT VALUE", inputValue)

    return filteredOptions(inputValue)
}

const handleCreate = async (inputValue) => {

    console.log("INPUT VALUE", inputValue)

    // send a post request to our api to create a new tag
    const res = await axios.post(`/api/tags/`, { label: inputValue })

    const newTag = res.data

    console.log("NEW TAG", newTag)

    return newTag
}



const TagSelect = () => {


    return <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        onCreateOption={handleCreate}

    />
};

export default TagSelect;