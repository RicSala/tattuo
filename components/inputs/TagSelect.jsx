import axios from 'axios';
import React from 'react';

import AsyncCreatableSelect from 'react-select/async-creatable';

const filteredOptions = async (inputValue) => {

    const res = await axios.get(`/api/tags?s=${inputValue}`)

    const tags = res.data


    return tags
};

const promiseOptions = (inputValue) => {

    return filteredOptions(inputValue)
}

const handleCreate = async (inputValue) => {

    // send a post request to our api to create a new tag
    const res = await axios.post(`/api/tags/`, { label: inputValue })

    const newTag = res.data

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