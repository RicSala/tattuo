'use client'

import Image from "next/image"
// import { useContext } from "react"
// import { AuthContext } from "../contexts/auth/AuthProvider"


export default function Avatar({
    user,
}) {

    return (
        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-400">
            {/* if user has a profile Pic, show it instead */}
            {user ?
                user?.profilePic ?
                    <Image src={user.profilePic} className="rounded-full h-8 w-8" alt="Profile Pic" width={200} height={200} />
                    :
                    <span className="font-semibold text-xl tracking-tight">
                        {/* {user.name.split(" ").map((word) => word[0])} */}
                    </span>
                :
                <Image src='/images/avatar.png' className="rounded-full h-8 w-8" alt="Profile Pic" width={200} height={200} />
            }
        </div>
    )
}

