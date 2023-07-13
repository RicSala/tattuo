import axios from 'axios';
import React from 'react';
import { Controller } from 'react-hook-form';

import AsyncCreatableSelect from 'react-select/async-creatable';


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



const TagSelectorControlled = ({
    control,
    name,
    trigger,
    rules,
    setValue,
}) => {


    return (

        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value = [], ref } }) => (

                <AsyncCreatableSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={promiseOptions}
                    onCreateOption={async (input) => {
                        const newTag = await handleCreate(input)
                        // setValue(name, newTag)
                        let newTags
                        if (value) newTags = [...value, newTag]
                        else newTags = [newTag]
                        console.log("VALUE!!", newTags)
                        onChange(newTags)
                        trigger(name)
                    }}
                    onBlur={onBlur}
                    onChange={(value) => {
                        console.log("ONCHANGE CALL!!!", value)
                        onChange(value); trigger(name)
                    }}
                    value={value}
                    isMulti={true}
                    isClearable={true}
                />)
            }
        />
    )
}
    ;

export default TagSelectorControlled;