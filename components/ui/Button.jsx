'use client'
import PropTypes from 'prop-types';



const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    type = "button",
    className

}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`
        relative
        disabled:opacity-50
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        px-2
        ${outline ? `bg-transparent` : `bg-primary`}
        ${outline ? `border-border` : `border-primary`}
        ${outline ? `text-primary` : `text-primary-foreground`}
        ${small ? `py-1` : `py-3`}
        ${small ? `text-sm` : `text-md`}
        ${small ? `font-light` : `font-semibold`}
        ${small ? `border-[1px]` : `border-2`}
        ${className}
        `}>
            {Icon && <Icon size={24} className="absolute left-4 top-1" />

            }
            {label}
        </button>
    )
};

export default Button;

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    icon: PropTypes.elementType,
    type: PropTypes.string
};



