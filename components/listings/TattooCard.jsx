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


// TODO: to be created

const boards = [
    { id: 1, title: 'Board 1' },
    { id: 2, title: 'Board 2' },
    { id: 3, title: 'Board 3' },
    { id: 4, title: 'Board 4' },
]

const TattooCard = ({
    data,
    listingType,
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

    const onBoardCreate = useCallback((title) => {
        console.log('create board', title)

        axios.post('/api/boards', { title: title })
            .then(res => {
                console.log(res.data)
                toast.success('Board created')
            })
            .catch(err => {
                toast.error('Something went wrong')
            }
            )

    }, [])

    const onBoardSelect = useCallback((tattoo, board) => {
        // add the tattoo to the board
        console.log('select board', tattoo, board)
        axios.post(`/api/boards/${board.id}/tattoos`, { tattooId: tattoo.id })
            .then(res => {
                console.log(res.data)
                toast.success('Tattoo added to board')
            })
            .catch(err => {
                toast.error('Something went wrong')
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
                    <div className="absolute top-3 left-3">
                        <SaveButton
                            listingId={data.id}
                            currentUser={currentUser}
                            listingType={listingType}
                        />

                    </div>
                    <div className="absolute bottom-3 left-3">
                        <TattooBoardAdder
                            tattoo={data}
                            boards={boards}
                            onBoardCreate={onBoardCreate}
                            onBoardSelect={onBoardSelect}
                            currentUser={currentUser}
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