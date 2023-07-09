'use client'

import { createContext } from "react";
import { useReducer } from 'react';
import { uiReducer } from "./uiReducer";



export const UiContext = createContext()

const UI_INITIAL_STATE = {
    RegisterModalisOpen: false,
    RegisterArtistModalisOpen: false,
    LoginModalisOpen: false,
    RentModalisOpen: false,
};

export const UiProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const onOpenRegisterModal = () => {
        dispatch({ type: '[UI] - onOpen register modal' });
    };

    const onCloseRegisterModal = () => {
        dispatch({ type: '[UI] - onClose register modal' });
    };

    const onOpenLoginModal = () => {
        dispatch({ type: '[UI] - onOpen Login modal' });
    };

    const onCloseLoginModal = () => {
        dispatch({ type: '[UI] - onClose Login modal' });
    };

    const onOpenRegisterArtistModal = () => {
        dispatch({ type: '[UI] - onOpen Register Artist modal' });
    };

    const onCloseRegisterArtistModal = () => {
        dispatch({ type: '[UI] - onClose Register Artist modal' });
    };

    const onOpenRentModal = () => {
        dispatch({ type: '[UI] - onOpen Rent modal' });
    };

    const onCloseRentModal = () => {
        dispatch({ type: '[UI] - onClose Rent modal' });
    };

    const onOpenSearchModal = () => {
        dispatch({ type: '[UI] - onOpen Search modal' });
    };

    const onCloseSearchModal = () => {
        dispatch({ type: '[UI] - onClose Search modal' });
    };

    // We return the state and the methods so we can use them in the components
    return (
        <UiContext.Provider value={{
            ...state,

            // methods

            onOpenRegisterModal,
            onCloseRegisterModal,
            onOpenLoginModal,
            onCloseLoginModal,
            onOpenRegisterArtistModal,
            onCloseRegisterArtistModal,
            // onOpenRentModal,
            // onCloseRentModal,
            // onOpenSearchModal,
            // onCloseSearchModal,
        }}>
            {children}
        </UiContext.Provider>
    );
};
