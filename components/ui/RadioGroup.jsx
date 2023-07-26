import React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { Controller } from "react-hook-form";


const RadioGroup = ({ value,
    control,
    name,
    trigger,
    rules,
    options,
    ...props
}) => {
    return (

        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (

                <RadixRadioGroup.Root
                    className="flex flex-col gap-2.5"
                    defaultValue={field.value}
                    aria-label="View density"
                    onValueChange={(value) => {
                        // it's hacky but it works
                        // TODO: find a better way to do this
                        console.log(value);
                        const event = { target: { name, value } };
                        field.onChange(event);
                        trigger(name);
                    }}
                >
                    {
                        options.map((option, index) => (

                            <div key={option.label} className="flex items-center">
                                <RadixRadioGroup.Item
                                    className="bg-background w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black hover:bg-slate-300 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                                    value={option.value}
                                    id={`r${index}`}
                                >
                                    <RadixRadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-black" />
                                </RadixRadioGroup.Item>
                                <label className="text-primary text-[15px] leading-none pl-[15px]" htmlFor={`r${index}`}>
                                    {options[index].label}
                                </label>
                            </div>
                        ))
                    }
                </RadixRadioGroup.Root>)}>

        </Controller>



    )
};
RadioGroup.displayName = RadixRadioGroup.Root.displayName


export default RadioGroup;