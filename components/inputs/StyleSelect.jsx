'use client'

import { getStyleList } from '@/libs/getStyleList';
import Select from 'react-select';
//  https://react-select.com/home

const CustomSelect = ({
    value,
    onChange,
    required,
    errors,
    options,
}) => {

    // const { getAll, getByValue } = useCountries();




    // TODO: Add validation visual feedback
    return (
        <div>
            <Select
                required={required}
                placeholder="Selecciona un estilo"
                isClearable
                options={options}
                value={value}
                onChange={(value) => onChange(value)}

                // describes how to render the options in the dropdown
                formatOptionLabel={
                    (option) => (
                        <div className="flex flex-row items-center gap-3">
                            <div>{option.label}</div>
                        </div>
                    )

                }


                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}

                // modifies the default styles of the dropdown
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6',
                    }
                })}
            />

        </div>
    )
};

export default CustomSelect;