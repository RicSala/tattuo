'use client'

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns'
import Image from "next/image";
// import HeartButton from "../HeartButton";
import Button from "../Button";
import HeartButton from "../HeartButton";
import SaveButton from "../SaveButton";
import TattooBoardAdder from "../TattooBoardAdder";
import axios from "axios";
import { toast } from "react-hot-toast";


const TattooCard = ({
    data,
    listingType,
    onAction,
    test,
    actionLabel,
    onSecondaryAction,
    secondaryActionLabel,
    disabled,
    actionId,
    currentUser,
    boardAdder = true
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

    const onBoardCreate = useCallback((title) => {
        return axios.post('/api/boards', { title: title })
            .then(res => {
                toast.success('Board created')
                return res.data
            })
            .catch(err => {
                toast.error('Something went wrong')
            }
            )

    }, [])

    const onBoardSelect = useCallback((tattoo, board) => {
        // add the tattoo to the board
        toast.success('Tattoo added to board')

        axios.post(`/api/boards/${board.id}/tattoos`, { tattooId: tattoo.id })
            .then(res => {
                console.log("response data:", res.data)
            })
            .catch(err => {
                console.log("ERROR - TattooCard", err)
                toast.error(err.response.data.error)
            }
            )
    }, [])


    return (
        <div
            onMouseEnter={() => router.prefetch(`/${translatedResource}/${data.id}`)} // With Link, the prefetch is automatic, with router is not
            onClick={() => router.push(`/${translatedResource}/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="
                                    min-w-[200px]
                aspect-square w-full relative overflow-hidden rounded-xl
                ">
                    <Image
                        fill
                        // REVIEW: Why do I need this???
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    {/* <div className="absolute top-3 left-3">
                        <SaveButton
                            listingId={data.id}
                            currentUser={currentUser}
                            listingType={listingType}
                        />

                    </div> */}
                    {
                        boardAdder &&
                        <div className="absolute bottom-3 left-3">
                            <TattooBoardAdder
                                key={data.id}
                                tattoo={data}
                                onBoardCreate={onBoardCreate}
                                onBoardSelect={onBoardSelect}
                                currentUser={currentUser}
                            />
                        </div>
                    }
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