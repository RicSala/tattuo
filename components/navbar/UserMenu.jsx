'use client'

import { AiOutlineMenu } from 'react-icons/ai';
// import Avatar from '../Avatar';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
// import MenuItem from './MenuItem';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Avatar from '../Avatar';
import { UiContext } from '@/providers/ui/UiProvider';
import MenuItem from './MenuItem';

const UserMenu = ({
    currentUser,
}) => {

    const userFromFE = useSession();
    // Snippet to close the menu when clicking outside of it
    const menuRef = useRef(null);
    const router = useRouter();
    const { onOpenRegisterModal, onOpenRegisterArtistModal, onOpenLoginModal, onOpenRentModal } = useContext(UiContext);
    const [isOpen, setIsOpen] = useState(false)

    const handleClickOutside = useCallback((event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);
    // End of snippet (ref added to the div below)



    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    // const onRent = useCallback(() => {
    //     if (!currentUser) {
    //         onOpenLoginModal();
    //         return;
    //     }

    //     onOpenRentModal();
    // }, [currentUser, onOpenLoginModal, onOpenRentModal])


    const artistMenu = (

        <>
            <MenuItem
                onMouseEnter={() => router.prefetch("/admin/tatuajes")}
                onClick={() => {
                    setIsOpen(false)
                    router.push("/admin/tatuajes")
                }}
                label="Mis tatuajes"
            />
            <MenuItem
                onMouseEnter={() => router.prefetch("/admin/profile")}
                onClick={() => {
                    setIsOpen(false)
                    router.push("/admin/profile")
                }}
                label="Mi perfil"
            />
            <MenuItem
                onClick={onOpenRentModal}
                label="Blog"
            />
        </>
    )

    const clientMenu = (

        <>
            <MenuItem
                onMouseEnter={() => router.prefetch("/tatuadores")}
                onClick={() => {
                    setIsOpen(false)
                    router.push("/tatuadores")
                }}
                label="Descubrir tatuadores"
            />
            <MenuItem
                onMouseEnter={() => router.prefetch("/tatuajes")}
                onClick={() => {
                    setIsOpen(false)
                    router.push("/tatuajes")
                }}
                label="Descubrir tatuajes"
            />
            <MenuItem
                onMouseEnter={() => router.prefetch("/tatuadores/saved")}
                onClick={() => {
                    setIsOpen(false)
                    router.push("/tatuadores/saved")
                }}
                label="Mis tatuadores favoritos"
            />
            <MenuItem
                onMouseEnter={() => router.prefetch("/tatuajes/saved")}
                onClick={() => {
                    setIsOpen(false)
                    router.push("/tatuajes/saved")
                }}
                label="Mis tatuajes guardados"
            />
            <MenuItem
                onClick={onOpenRentModal}
                label="Mi perfil"
            />

        </>
    )


    const loginMenu = (
        <>
            <MenuItem
                onClick={onOpenLoginModal}
                label="Login"
            />
            <MenuItem
                onClick={onOpenRegisterModal}
                label="Sign Up"
            />
        </>
    )



    return (
        <div className="relative" ref={menuRef}>
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onOpenRegisterArtistModal}
                    className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    "
                >
                    ¿Eres tatuador?
                </div>

                <div
                    onClick={toggleOpen}
                    className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                    "
                >

                    <AiOutlineMenu size={20} />

                    <div className="hidden md:block">
                        <Avatar user={currentUser} isArtist={false} />
                    </div>

                </div>

            </div>

            {
                isOpen &&
                <div className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                ">

                    <div className="flex flex-col cursor-pointer">
                        {currentUser && currentUser.role === 'ARTIST' &&
                            <>
                                {artistMenu}
                                <hr />
                                {clientMenu}
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Salir"
                                />
                            </>

                        }
                        {currentUser && currentUser.role === 'CLIENT' &&
                            <>
                                {clientMenu}
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Salir"
                                />
                            </>
                        }
                        {!currentUser && loginMenu}

                    </div>


                </div>
            }

        </div >
    )
};

export default UserMenu