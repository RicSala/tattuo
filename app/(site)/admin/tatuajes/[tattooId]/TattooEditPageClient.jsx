'use client'

import Button from "@/components/Button";
import ImageUpload from "@/components/inputs/ImageUpload";
import Input from "@/components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const TattooEditPageClient = ({
    tattoo
}) => {

    console.log("TATTOO", tattoo)

    const { setError, clearErrors, control, register, handleSubmit, setValue, getValues, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: tattoo.title,
            description: tattoo.description,
            imageSrc: tattoo.imageSrc,
            category: tattoo.category,
            tattooId: tattoo.id,
        }
    });

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data) => {

        //REVIEW: validation should be done in the form itself, not here
        if (!data.imageSrc) {
            return toast.error("Debes subir una foto")
        }

        setIsLoading(true)
        if (data.tattooId === "new") {
            axios.post(`/api/tattoos/`, data) //TODO: change to fetch (from Next)
                .then(res => {
                    console.log("RESPUESTA", res)
                    toast.success("Tatuaje actualizado")
                    router.push(`/admin/tatuajes/${res.data.id}`)
                })
                .catch(err => {
                    console.log("ERR", err)
                    toast.error("Error al actualizar el tatuaje")
                })
                .finally(() => {
                    setIsLoading(false)
                })
            return
        }

        axios.put(`/api/tattoos/`, data)
            .then(res => {
                console.log("RESPUESTA", res)
                toast.success("Tatuaje actualizado")
                router.push(`/admin/tatuajes/${res.data.id}`)
            })
            .catch(err => {
                console.log("ERR", err)
                toast.error("Error al actualizar el tatuaje")
            }
            )
            .finally(() => {
                setIsLoading(false)
            }
            )

        return
    }

    const image = watch("imageSrc")
    const title = watch("title")

    const customSetValue = (field, value) => {
        setValue(field, value, {
            shouldValidate: true, // By default, setting the field value using setValue does not trigger validation. However, if you set shouldValidate to true, it will trigger validation for that field.
            shouldDirty: true,  // Marking a field as dirty means that its value has changed from the initial/default value
            shouldTouch: true, // Marking a field as touched means that the user has interacted with the field, even if it was not changed
        });

    }


    return (
        <div>
            <h1>Edit Tattoo</h1>

            <p>
                {JSON.stringify(tattoo)}
                {JSON.stringify(getValues())}
            </p>


            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="title"
                    label="Título"
                    errors={errors}
                    required
                    register={register}
                    disabled={isLoading}
                />
                <Input
                    id="description"
                    label="Descripción"
                    errors={errors}
                    required
                    register={register}
                    disabled={isLoading}

                />
                {/* <Input
                    id="imageSrc"
                    label="Foto"
                    errors={errors}
                    required
                    register={register}
                /> */}

                <ImageUpload
                    value={image}
                    onChange={(value) => customSetValue("imageSrc", value)}
                />

                <Input
                    id="category"
                    label="Categoría"
                    errors={errors}
                    required
                    register={register}
                    disabled={isLoading}

                />

                <Button type="submit">Guardar</Button>


            </form>
        </div >
    )
};
export default TattooEditPageClient;