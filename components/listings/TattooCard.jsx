'use client'

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns'
import Image from "next/image";
// import HeartButton from "../HeartButton";
import Button from "../Button";
import HeartButton from "../HeartButton";
import SaveButton from "../SaveButton";

const TattooCard = ({
    data,
    listingType,
    reservation,
    onAction,
    actionLabel,
    onSecondaryAction,
    secondaryActionLabel,
    disabled,
    actionId,
    currentUser,
}) => {


    const router = useRouter();


    const translatedResource = useMemo(() => {
        switch (listingType) {
            case 'tattoos':
                return 'tatuajes'
            case 'artists':
                return 'tatuadores'
            default:
                return 'listings'
        }
    }, [listingType])


    // REVIEW: with this, I am not willingly preventing prefetching 
    const handlePrimaryAction = useCallback((event) => {
        event.stopPropagation()
        if (disabled) {
            return
        }
        onAction?.(actionId)
    }, [actionId, disabled, onAction])


    const handleSecondaryAction = useCallback((event) => {
        event.stopPropagation()
        if (disabled) {
            return
        }
        onSecondaryAction?.(actionId)
    }, [actionId, disabled, onSecondaryAction])


    return (
        <div
            onMouseEnter={() => router.prefetch(`/${translatedResource}/${data.id}`)} // With Link, the prefetch is automatic, with router is not
            onClick={() => router.push(`/${translatedResource}/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="
                aspect-square w-full relative overflow-hidden rounded-xl
                ">
                    <Image
                        fill={true}
                        alt='listing'
                        src={listingType === 'tattoos' ? data.imageSrc : data.mainImage}
                        // TODO: to refactor
                        className="
                    object-cover
                    h-full
                    w-full
                    group-hover:scale-110
                    transition
                    "

                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                            listingType={listingType}
                        />

                    </div>
                    <div className="absolute top-3 left-3">
                        <SaveButton
                            listingId={data.id}
                            currentUser={currentUser}
                            listingType={listingType}
                        />

                    </div>
                </div>

                <div className="flex flex-row justify-between gap-7">
                    {onAction && actionLabel && (
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handlePrimaryAction}
                        />
                    )}
                    {onSecondaryAction && secondaryActionLabel && (
                        <Button
                            disabled={disabled}
                            small
                            label={secondaryActionLabel}
                            onClick={handleSecondaryAction}
                        />
                    )}
                </div>

            </div>

        </div>
    )
};

export default TattooCard;