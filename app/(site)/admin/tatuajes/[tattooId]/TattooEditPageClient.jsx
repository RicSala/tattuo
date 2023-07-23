'use client'

import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import TagSelectorControlled from "@/components/inputs/TagSelectControlled";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ImageUploadControlled2 from "@/components/inputs/ImageUploadControlled2";
import ImageThumbnails from "@/components/ImageThumbnails";

const TattooEditPageClient = ({
    tattoo,
    styles,
    bodyParts,
}) => {


    const { trigger, setError, clearErrors, control, register, handleSubmit, setValue, getValues, watch, reset, formState: { errors, isSubmitted }, formState } = useForm({
        defaultValues: {
            title: tattoo.title || "",
            description: tattoo.description || "",
            imageSrc: tattoo.imageSrc || "",
            style: tattoo.style || "",
            tattooId: tattoo.id || "new",
            bodyPart: tattoo.bodyPart || undefined,
            tags: tattoo.tags?.map(tag => (tag.tag)) || undefined,
        }
    });

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    //REVIEW: Interesting to see what it returns. That's what is spreaded on each input
    // console.log(register("name"))


    const onSubmit = async (data) => {

        setIsLoading(true)

        // if tatto is new, we need to create it
        if (data.tattooId === "new") {
            axios.post(`/api/tattoos/`, data) //TODO: change to fetch (from Next)
                .then(res => {
                    toast.success("Tatuaje actualizado")
                    // after creating the tattoo, we redirect to the edit page,
                    // so the user does not add more tattoos by mistake
                    router.push(`/admin/tatuajes/${res.data.id}`)
                })
                .catch(err => {
                    console.log("ERROR - TattooEditPageClient", err)
                    toast.error("Error al actualizar el tatuaje")
                })
                .finally(() => {
                    setIsLoading(false)
                })
            return
        }


        // else we update it
        axios.put(`/api/tattoos/`, data)
            .then(res => {
                toast.success("Tatuaje actualizado")
                router.push(`/admin/tatuajes/${res.data.id}`)
            })
            .catch(err => {
                console.log("ERROR - TattooEditPageClient", err)
                toast.error("Error al actualizar el tatuaje")
            }
            )
            .finally(() => {
                setIsLoading(false)
            }
            )

        return
    }


    // is this really the best way to do this?
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.tagName.toLowerCase() !== 'textarea') {
            event.preventDefault(); // prevent the default action
            event.stopPropagation(); // stop the event from bubbling up
        }
    };


    const onError = (errors, e) => {
        toast.error("Por favor, revisar el formulario")
    };

    return (
        <div>
            <Heading title="Editar tatuaje" />

            <form onSubmit={handleSubmit(onSubmit, onError)}
                //We want to prevent the form from submitting when pressing enter
                onKeyDown={handleKeyDown}>

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

                {/* <TagSelector /> */}

                <TagSelectorControlled
                    control={control}
                    name="tags"
                    trigger={trigger}
                    errors={errors}
                    setValue={setValue}
                    rules={{
                        required: "Debes seleccionar al menos un tag",
                        // max lenth of the array is 3
                        validate: (value) => value.length <= 3 || "Máximo 3 tags"
                    }}
                />


                {
                    errors.imageSrc &&
                    <div className="text-red-500">
                        {errors.imageSrc.message}
                    </div>
                }


                <ImageThumbnails imageSrc={getValues("imageSrc") || null} setValue={setValue} />
                <ImageUploadControlled2
                    control={control}
                    maxFiles={1}
                    name="imageSrc"
                    trigger={trigger}
                    errors={errors}
                    rules={{
                        required: "Debes subir al menos una imagen",
                        // at least 3 images required
                        // validate: (value) => value.length >= 3 || "Mínimo 3 imágenes"
                    }}
                />


                {/* {
                    errors.style &&
                    <div className="text-red-500">
                        {errors.style.message}
                    </div>
                } */}
                <Controller
                    name="style"
                    control={control}
                    rules={{
                        required: "Debes seleccionar un estilo",
                        // max lenth of the array is 3
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            isMulti={false}
                            name={field.name}
                            // The next three lines are the same as doing: ...field
                            // value={field.value}
                            // onChange={(option) => field.onChange(option)}
                            // onBlur={field.onBlur}
                            options={styles}
                            field={field}
                            errors={errors}
                        />} />


                {
                    errors.bodyPart &&
                    <div className="text-red-500">
                        {errors.bodyPart.message}
                    </div>
                }
                <Controller
                    name="bodyPart"
                    control={control}
                    rules={{
                        required: "Debes seleccionar una parte del cuerpo"
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            isMulti={false}
                            field={field}
                            options={bodyParts}
                        />} />
                <Button type="submit" label={isLoading ? "Guardando..." : "Guardar"} disabled={isLoading} />
            </form>

        </div >
    )
};
export default TattooEditPageClient;