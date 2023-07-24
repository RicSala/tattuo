'use client'

import { useContext, useEffect, useRef, useState } from 'react';
import Input from './inputs/Input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UiContext } from '@/providers/ui/UiProvider';
import { AuthContext } from '@/providers/auth/AuthProvider';

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
    // - We use a local state to update the UI immediately
    // - that local state is initialized with the global state
    // - when the user clicks, we update the local state and send the request to the server
    // - if the request is succesful, the currentUser will be updated and the "data" of the session will change
    // - the useEffect of the context (that depends on the data( will update the global state with the new data




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
            {!showBoards && !showInput && (
                <div className="heart-icon bg-transparent rounded-full">❤️</div>
            )}
            {showBoards && !showInput && (
                <div className="boards-list">
                    {userFromContext && boards.map((board) => (
                        <div
                            key={board.id}
                            onClick={(event) => {
                                event.stopPropagation()
                                onBoardSelect(tattoo, board);
                                setShowBoards(false);
                            }}
                        >
                            {board.title}
                        </div>
                    ))}
                    <div
                        onClick={(event) => {
                            event.stopPropagation()
                            setShowInput(true);
                        }}
                    >
                        Create new board
                    </div>
                </div>
            )}
            {showInput && <div className="board-adder-input
            
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