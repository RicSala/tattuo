"use client"


import { SessionProvider } from "next-auth/react"

export default function CustomSessionProvider({ children }) {
    return (
        // REVIEW: why it works if I am not passing session?
        //     <SessionProvider session={session}>
        // 
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}