import Heading from "./Heading";
import Link from "next/link";

export default function HeadingWithButton({
    title,
    actionLabel,
    onAction,
}) {
    return (
        <div className="
    flex flex-row justify-between items-center
    ">
            <Heading title="Mis tatuajes guardados" />
            <div className="flex justify-end items-center py-2">
                <div className="bg-primary p-2 rounded-md text-primary-foreground flex justify-center items-center">
                    <Link href="/admin/tatuajes/new">Nuevo tatuaje</Link>
                </div>
            </div>
        </div>
    );
}