"use client"


import { SessionProvider } from "next-auth/react"

export default function CustomSessionProvider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}