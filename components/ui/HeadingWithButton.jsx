'use client'

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

export default function HeadingWithButton({
    title,
    actionLabel,
    buttonUrl,
}) {

    const router = useRouter()

    const handleOnClick = () => {
        router.push(buttonUrl)
    }

    return (
        <div className="
    flex flex-row justify-between items-center
    ">
            <Heading title={title} />{
                actionLabel && buttonUrl &&
                <div className="flex justify-end items-center py-2">
                    <Button label={actionLabel} onClick={handleOnClick} />
                </div>}
        </div>
    );
}