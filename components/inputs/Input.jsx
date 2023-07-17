'use client'

import { BiEuro } from "react-icons/bi";

const Input = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    validation,
    register, //For React Hook Form
    errors, //For React Hook Form
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiEuro size={24} className="text-neutral-700 absolute top-5 right-2" />)
            }

            <input
                id={id}
                disabled={disabled}
                {...register(id, {
                    required: required ? 'Campo requerido' : false,
                    ...validation
                })}
                placeholder=" " // for the animation
                type={type}
                className={`
                peer
                w-full
                p-4
                pt-6
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                border-black
                ${formatPrice ? 'pl-9' : 'pl-4'}
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
            <label
                htmlFor={id}
                className={`
            cursor-text
            absolute
            text-md
            duration-150
            transform
            -translate-y-3
            top-5
            z-10
            origin-[0]
            ${formatPrice ? 'left-9' : 'left-4'}
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`
                }>
                {label} {errors[id] && '- ' + (errors[id].message ? errors[id].message : '')}
            </label>


        </div>
    )
};

export default Input;