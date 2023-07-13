'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {

    const router = useRouter();

    return (
        <div
            onClick={() => router.push("/")}
            className=""

        >
            <Image
                src="/images/logo.png"
                alt="Logo image"
                width={100}
                height={100}
                // REVIEW: Why do I need this???
                style={{ width: 'auto', height: '100%' }}
            />
        </div>
    )
};

export default Logo;
