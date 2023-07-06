'use client'

import Select from 'react-select';
//  https://react-select.com/home
import useCountries from '../../hooks/useCountries';

const CountrySelect = ({
    value,
    onChange,
}) => {

    const { getAll, getByValue } = useCountries();

    // TODO: It's not printing the flags

    return (
        <div>
            <Select
                placeholder="Selecciona un país"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value)}

                // describes how to render the options in the dropdown
                formatOptionLabel={
                    (option) => (
                        <div className="flex flex-row items-center gap-3">
                            <div>{option.flag}</div>
                            <div>{option.label},
                                <span className='text-neutral-500 ml-1'> {option.region}</span>
                            </div>
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

export default CountrySelect;