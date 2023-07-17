'use client'

import { useState } from 'react';
import Input from './inputs/Input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const TattooBoardAdder = ({ tattoo, onBoardCreate, onBoardSelect, currentUser }) => {
    const [showBoards, setShowBoards] = useState(false);
    const [isInputVisible, setIsInputVisible] = useState(false);

    const router = useRouter();

    // get the user session 

    const boards = currentUser.boards
    console.log(boards)
    console.log(currentUser)


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: ''
        }
    });

    const onSubmit = async (data) => {
        console.log(data);
        onBoardCreate(data.title);
        setIsInputVisible(false);
        router.refresh()
    }

    return (
        <div
            className="tattoo-board-adder
            bg-white
            rounded-lg
            "
            onMouseEnter={() => setShowBoards(true)}
            onMouseLeave={() => setShowBoards(false)}
        >
            <div className="heart-icon bg-transparent rounded-full">❤️</div>
            {showBoards && !isInputVisible && (
                <div className="boards-list">
                    {boards.map((board) => (
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
                            setIsInputVisible(true);
                        }}
                    >
                        Create new board
                    </div>
                </div>
            )}
            {isInputVisible && <div className="board-adder-input">
                <form onSubmit={handleSubmit(onSubmit)}
                    onClick={(event) => {
                        event.stopPropagation()
                    }
                    }
                >
                    <Input
                        id="title"
                        label="New Board"
                        type="text"
                        register={register}
                        errors={errors}
                    />
                </form>
            </div>
            }
        </div>
    );
};

export default TattooBoardAdder;