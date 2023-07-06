'use client'

import { createContext } from "react";
import { useEffect, useReducer } from 'react';

import { signOut, useSession } from 'next-auth/react';
import { authReducer } from "./authReducer";





export const AuthContext = createContext()


const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined, // When we load the app, we don't know the user
};

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    const { data, status } = useSession()

    useEffect(() => {

        if (status === 'authenticated') {
            dispatch({ type: '[AUTH] - Login', payload: data?.user });
        }
    }, [status, data])


    // We return the state and the methods so we can use them in the components
    return (
        <AuthContext.Provider value={{
            ...state,

            // methods
            // registerUser, // REVIEW: Prefer to do it from the modal
        }}>
            {children}
        </AuthContext.Provider>
    );
};
