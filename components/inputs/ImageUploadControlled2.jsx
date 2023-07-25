'use client'

import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Button from "../Button";
import { Controller } from "react-hook-form";

const ImageUploadControlled2 = ({
    maxFiles = 3,
    control,
    name,
    trigger,
    rules,
}) => {

    // TODO: improve cloudinary widget: https://cloudinary.com/documentation/upload_widget
    return (

        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (

                <CldUploadWidget
                    onUpload={
                        (result) => {
                            if (Array.isArray(field.value)) { field.onChange([...field.value, result.info.secure_url]) }
                            // if value is a string, replace it
                            else {
                                field.onChange(result.info.secure_url)
                                trigger(name)
                            }
                            console.log("result", result)
                        }}
                    uploadPreset="lbgb29le"
                    onBlur={field.onBlur}
                    value={field.value}
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
                            <>
                                <Button
                                    onClick={() => open?.()}
                                    small={true}
                                    icon={TbPhotoPlus}
                                    label={"Subir imagen"}
                                    outline={true}
                                />
                            </>
                        )
                    }}

                </CldUploadWidget >)} />
    )
}

export default ImageUploadControlled2;