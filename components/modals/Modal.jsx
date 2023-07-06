'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

const Modal = ( //all the props we need to customize the modal
    { isOpen, // is the modal open?
        onClose, // when closing the model, what else should we do? We don't need an onOpen, because we are not opening the modal from here
        onSubmit,
        title,
        body,
        footer,
        actionLabel,  // custom label for the action button
        disabled, // is the action button disabled?
        secondaryAction,
        secondaryActionLabel, }
) => {

    const [showModal, setShowModal] = useState(isOpen);
    // it use props as its initial state.

    const modalRef = useRef();


    useEffect(() => { // whenever isOpen changes, we update the state of the modal. useState arg is only the initial state
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);
        setTimeout(() => { // we wait for the animation to finish before closing the modal, so it doesn't disappear abruptly
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleOutsideClick = (event) => {
        if (!modalRef.current.contains(event.target) || modalRef.current === event.target) {
            handleClose();
        }
    };

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit(); // REVIEW: how does the modal dissapear after submitting? --> it's closed on the parent component
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {

        if (disabled || !secondaryAction) return;
        secondaryAction();
    }, [disabled, secondaryAction]);


    // if (!isOpen) we don't even render the modal (it's not that we display:none it)
    if (!isOpen) return null;

    return (
        <>
            <div
                onClick={handleOutsideClick}
                ref={modalRef}
                className="
            justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70
            text-black
            ">
                <div className="
                relative
                w-full
                md:w-4/6
                lg:w-3/6
                xl:w-2/5
                my-6
                mx-auto
                h-full
                lg:h-auto
                md:h-auto
                ">
                    {/* CONTENT */}

                    <div className={`
                    translate
                    duration-300
                    h-full
                    ${showModal ? 'translate-y-0' : 'translate-y-full'}
                    ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}
                    >
                        <div className="
                        translate
                        h-full
                        lg:h-auto
                        md:h-auto
                        border-0
                        rounded-lg
                        shadow-lg
                        relative
                        flex
                        flex-col
                        w-full
                        bg-white
                        outline-none
                        focus:outline-none
                        ">
                            {/* HEADER */}
                            <div className="
                            flex
                            items-center
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                            ">

                                <button
                                    className="
                                p-1
                                border-0
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                                "
                                >
                                    <IoMdClose size={18} onClick={handleClose} />
                                </button>

                                <div
                                    className="
                                    text-lg font-semibold
                                    "
                                >
                                    {title}
                                </div>
                            </div>
                            {/* BODY */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>

                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="
                                flex
                                flex-row
                                items-center
                                gap-4
                                w-full
                                ">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
};

export default Modal;