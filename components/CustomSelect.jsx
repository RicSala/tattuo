import Select from 'react-select';



const CustomSelect = ({
    options,
    field,
    isMulti = false,
    value,
    onChange,
    placeholder = "Select...",
}) => {

    return (
        <Select
            {...field}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
            isSearchable
            // noOptionsMessage={() => "No hay opciones"}
            styles={{
                control: (provided, state) => ({ // this is the style of the container
                    ...provided,
                    border: state.isFocused ? "1px solid #000" : "1px solid #000",
                    boxShadow: state.isFocused ? "0 0 0 1px #000" : "none",
                    "&:hover": {
                        border: state.isFocused ? "1px solid #000" : "1px solid #000",
                    },
                }),
                option: (provided, state) => ({ // this is the style of the options
                    ...provided,
                    backgroundColor: state.isFocused ? "#000" : "#fff",
                    color: state.isFocused ? "#fff" : "#000",
                }),

                dropdownIndicator: (provided, state) => ({ // this is the style of the arrow
                    ...provided,
                    color: state.isFocused ? "#000" : "#000",
                }),

                indicatorSeparator: (provided, state) => ({ // this is the style of the line below the arrow
                    ...provided,
                    backgroundColor: state.isFocused ? "#000" : "#000",
                }),

                multiValueRemove: (provided, state) => ({ // this is the style of the X to remove the selected option
                    ...provided,
                    color: state.isFocused ? "#000" : "#000",
                    "&:hover": {
                        color: state.isFocused ? "#000" : "#000",
                        backgroundColor: state.isFocused ? "#000" : "#000",
                    },
                }),



            }}
        />
    )
};
export default CustomSelect;