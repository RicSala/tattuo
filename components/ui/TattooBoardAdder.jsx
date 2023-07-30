'use client'

import { useContext, useEffect, useRef, useState } from 'react';
import Input from '../inputs/Input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UiContext } from '@/providers/ui/UiProvider';
import { AuthContext } from '@/providers/auth/AuthProvider';
import Button from './Button';

const TattooBoardAdder = ({ tattoo, onBoardCreate, onBoardSelect, currentUser }) => {

    const [showBoards, setShowBoards] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const { onOpenLoginModal } = useContext(UiContext)
    const { removeBoardFromUser, user: userFromContext } = useContext(AuthContext)
    const [boards, setBoards] = useState([
        currentUser?.boards
    ])

    //REVIEW: ! The optimistic update took me a while to figure out.
    // I am letting the useEffect of the context the update the global state when the currentUser changes
    // but on a local level, I am updating the state of the boards immediately after the user clicks on the button
    // so the pattern is:
    // - local state is initialized with the global state
    // - when the user clicks, we update the local state and send the request to the server
    // - if the request is succesful, the currentUser will be updated and the "data" of the session will change


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: ''
        }
    });

    useEffect(() => {
        setBoards(currentUser?.boards)
    }, [currentUser?.boards])


    const onSubmit = async (data) => {
        if (!currentUser) return onOpenLoginModal()
        // Optimistic update -> we add the board to the user before the request is done
        const temporaryBoard = { ...data, id: Date.now() }
        setBoards([...boards, temporaryBoard])
        // We send the request to the server to create the board in the database after we have added it to the user
        onBoardCreate(data.title)
            .then((newBoard) => {

                // We select the board
                onBoardSelect(tattoo, newBoard)
            })
            .catch((error) => {
                console.log("ERROR - TattooBoardAdder", error)
                // If there is an error, we remove the board from the user
                removeBoardFromUser(temporaryBoard.id)
            })
        // close the input
        setShowInput(false);
    }


    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowBoards(false);
                setShowInput(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <div
            ref={containerRef}
            className="tattoo-board-adder
            bg-white
            rounded-lg
            "
            onMouseEnter={() => setShowBoards(true)}
            onMouseLeave={() => setShowBoards(false)}
        >
            {
                // Adder button -> show list of boards
                !showBoards && !showInput && (
                    <div className="heart-icon rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>

                    </div>
                )}


            {
                // Tattoo board list
                showBoards && !showInput && (
                    <div className="boards-list
                    border-border
                    p-2
                    ">
                        {userFromContext && boards.map((board) => (
                            <div
                                key={board.id}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    onBoardSelect(tattoo, board);
                                    setShowBoards(false);
                                }}
                                className='
                                hover:bg-slate-200
                                cursor-pointer
                                p-2
                                rounded-lg
                                '
                            >
                                {board.title}
                            </div>
                        ))}
                        <Button
                            onClick={(event) => {
                                event.stopPropagation()
                                setShowInput(true);
                            }}
                            label="Create new board"
                        />
                    </div>
                )}

            {
                // Dashboard input to create a new board
                showInput && <div className="board-adder-input
            
            ">
                    <form onSubmit={handleSubmit(onSubmit)}
                        onClick={(event) => {
                            event.stopPropagation()
                        }
                        }
                    >
                        <div className="
                flex flex-row
                ">
                            <Input
                                id={`title`}
                                // id is like this to avoid the same id for all the boards. We have to separate them in the endpo
                                label="New Board"
                                type="text"
                                register={register}
                                errors={errors}
                            />

                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default TattooBoardAdder;