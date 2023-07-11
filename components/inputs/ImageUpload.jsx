'use client'

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Button from "../Button";

const ImageUpload = ({
    onChange,
    value,
    maxFiles = 3,
}) => {


    const handleUpload = useCallback((result) => {
        console.log("result", result)
        onChange(result.info.secure_url);
    }, [onChange]);


    // TODO: improve cloudinary widget: https://cloudinary.com/documentation/upload_widget
    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="lbgb29le"
            // doesnt work

            options={
                {
                    maxFiles: maxFiles,

                    sources: ["local", "url", "camera", "instagram", "facebook", "google_drive", "url"],
                    language: "es",
                    text: {
                        "es": {
                            "queue": {
                                "title": "Archivos para subir",
                                "title_uploading_with_counter": `Subiendo ${maxFiles} archivos`,
                            },
                            "crop": {
                                "title": "Recorta tu imagen",

                            },
                            "local": {
                                "browse": "...archivos",
                                "dd_title_single": "Arrastra una imagen aquí",
                                "dd_title_multi": `Arrastra hasta ${maxFiles} imágenes aquí`,

                            },
                            "or": "o navega por tus...",
                            "back": "Anterior",
                            "advanced": "Avanzado",
                            "close": "Cerrar",
                            "no_results": "Sin resultados",
                            "search_placeholder": "Buscar archivos",

                            "menu": {
                                "files": "Mis archivos",
                                "web": "Página web",
                                "camera": "Cámara",
                                "gsearch": "Google Search",
                                "gdrive": "Google Drive",
                                "dropbox": "Dropbox",
                                "facebook": "Facebook",
                                "instagram": "Instagram",
                                "shutterstock": "Shutterstock",
                                "getty": "gettyimages",
                                "istock": "iStock",
                                "unsplash": "Unsplash"
                            },
                            "actions": {
                                "upload": "Subir",
                                "next": "Siguiente",
                                "clear_all": "Limpiar todo",
                                "log_out": "Log out"
                            },
                        }
                    }
                }
            }>
            {({ open }) => {
                return (
                    <Button
                        onClick={() => open?.()}
                        small={true}
                        icon={TbPhotoPlus}
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
                        label={"Subir imagen"}
                    />
                )
            }}

        </CldUploadWidget >
    )
}

export default ImageUpload;