'use client'

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

const ImageUpload = ({
    onChange,
    value,
}) => {


    const handleUpload = useCallback((result) => {
        onChange(result.info.secure_url);
    }, [onChange]);


    // TODO: improve cloudinary widget: https://cloudinary.com/documentation/upload_widget
    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="lbgb29le"
            // language="es" // doesnt work

            options={
                {
                    maxFiles: 1,

                    sources: ["local", "url", "camera", "instagram", "facebook", "google_drive", "url"],
                }
            }>
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
                        relative
                        cursor-pointer
                        hover:opacity-70
                        transition-opacity
                        border-dashed
                        border-2
                        p-20
                        border-neutral-300
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-4
                        text-neutral-600
                        "
                    >
                        <TbPhotoPlus size={50} />
                        <div
                            className="font-semibold text-lg"
                        >
                            Haz click para subir una imagen
                        </div>

                        {value && (
                            <div
                                className="
                                absolute
                                inset-0
                                w-full
                                h-full"
                            >

                                <Image
                                    alt="Imagen subida"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    src={value}
                                />


                            </div>
                        )}

                    </div>
                )
            }}

        </CldUploadWidget >
    )
}

export default ImageUpload;