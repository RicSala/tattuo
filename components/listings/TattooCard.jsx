'use client'

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import HeartButton from "../ui/HeartButton";
import TattooBoardAdder from "../ui/TattooBoardAdder";
import axios from "axios";
import { toast } from "react-hot-toast";


const TattooCard = ({
    data,
    listingType = 'tattoos',
    onAction,
    test,
    actionLabel,
    onSecondaryAction,
    secondaryActionLabel,
    disabled,
    actionId,
    currentUser,
    boardAdder = true,
    canLike = true,
    canSave = true,
    secondaryActionId,
}) => {

    // used for optimistic deletion
    const [isDeleting, setIsDeleting] = useState(false)


    const router = useRouter();

    // TODO: This is a bit hacky, but it works. Need to find a better way to do this
    // Start of hacky code...
    const deleteFromBoard = async (tattooId) => {
        setIsDeleting(true)
        toast.success('Tattoo removed from board')


        await axios.delete(`/api/boards/${secondaryActionId}/tattoos/`, {
            data: {
                tattooId: tattooId
            }
        })
            .then(res => {
                router.refresh()
                return res.data
            })
    }

    if (actionLabel === 'Eliminar de tablero') {
        onAction = deleteFromBoard
    }
    // End of hacky code


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
                router.refresh()
                return res.data
            })
            .catch(err => {
                toast.error('Something went wrong')
            }
            )

    }, [router])

    const onBoardSelect = useCallback((tattoo, board) => {
        // add the tattoo to the board
        toast.success('Tatuaje añadido a tu tablero')

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

    if (isDeleting) { return }

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
                    <div className="absolute top-3 right-3
                    opacity-0 group-hover:opacity-100 transition duration-400 ease-in-out
                    ">
                        {
                            canLike &&
                            <HeartButton
                                listingId={data.id}
                                currentUser={currentUser}
                                listingType={listingType}
                            />
                        }

                    </div>
                    {
                        canSave && boardAdder &&
                        <div className="absolute bottom-3 left-3
                        opacity-0 group-hover:opacity-90 transition duration-400 ease-in-out

                        ">
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