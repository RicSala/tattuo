'use client'

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns'
import Image from "next/image";
// import HeartButton from "../HeartButton";
import Button from "../Button";
import HeartButton from "../HeartButton";

const ListingCard = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId,
    currentUser,
}) => {


    const router = useRouter();

    const location = useMemo(() => {
        return {
            region: 'Spain',
            label: 'Barcelona'
        }
    }, [])



    // REVIEW: with this, I am not willingly preventing prefetching 
    const handleCancel = useCallback((event) => {
        event.stopPropagation()
        if (disabled) {
            return
        }
        onAction?.(actionId)
    }, [actionId, disabled, onAction])


    // const price = useMemo(() => {

    //     if (reservation) {
    //         return reservation.totalPrice
    //     }

    //     return data.price
    // }, [data.price, reservation])

    const reservationDate = useMemo(() => {

        if (!reservation) {
            return null
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])


    // INSIGHT: "fill" in the image seems to fix the problem with ""

    //TODO: no index & no follow in the admin pages


    return (
        <div
            onMouseEnter={() => router.prefetch(`/tatuajes/${data.id}`)} // With Link, the prefetch is automatic, with router is not
            onClick={() => router.push(`/tatuajes/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="
                aspect-square w-full relative overflow-hidden rounded-xl
                ">
                    <Image
                        fill={true}
                        alt='listing'
                        src={data.imageSrc}
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
                            currentUser={currentUser} />

                    </div>
                </div>

                <div className=" font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>

                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>

                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">{
                        '100'
                    }€</div>
                    {!reservation && (
                        <div className="font-light">por noche</div>
                    )}
                </div>
                <div>
                    {onAction && actionLabel && (
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancel}
                        />
                    )}
                </div>

            </div>

        </div>
    )
};

export default ListingCard;