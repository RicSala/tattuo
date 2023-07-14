'use client'

import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import ImageUploadControlled from "@/components/inputs/ImageUploadControlled";
import Input from "@/components/inputs/Input";
import TagSelectorControlled from "@/components/inputs/TagSelectControlled";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const TattooEditPageClient = ({
    tattoo,
    styles,
    bodyParts,
}) => {


    const { trigger, setError, clearErrors, control, register, handleSubmit, setValue, getValues, watch, reset, formState: { errors }, formState } = useForm({
        defaultValues: {
            title: tattoo.title,
            description: tattoo.description,
            imageSrc: tattoo.imageSrc,
            style: tattoo.style,
            tattooId: tattoo.id,
            bodyPart: tattoo.bodyPart,
            tags: tattoo.tags?.map(tag => (tag.tag))
        }
    });

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    //REVIEW: Interesting to see what it returns. That's what is spreaded on each input
    // console.log(register("name"))

    console.log("TATTOO", tattoo)

    const onSubmit = async (data) => {

        console.log("SUBMIT", data)

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


    // is this really the best way to do this?
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.tagName.toLowerCase() !== 'textarea') {
            event.preventDefault(); // prevent the default action
            event.stopPropagation(); // stop the event from bubbling up
        }
    };


    return (
        <div>
            <h1>Edit Tattoo</h1>

            <p>
                {JSON.stringify(tattoo)}
                {JSON.stringify(getValues())}
            </p>


            <form onSubmit={
                handleSubmit(onSubmit)
            }

                onKeyDown={handleKeyDown}
            >

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
                <Controller
                    name="imageSrc"
                    control={control}
                    errors={errors.imageSrc}
                    rules={{ required: 'Debes subir una imagen' }}
                    render={({ field }) => {
                        return (<ImageUploadControlled
                            // This looks like a bit "hacky" but it works (instead of passing the error in the Controller)
                            // errors={errors?.imageSrc?.message}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            onBlur={field.onBlur}
                        />)
                    }} />


                {
                    errors.style &&
                    <div className="text-red-500">
                        {errors.style.message}
                    </div>
                }


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
                            // The next three lines are the same as doing: ...field
                            // value={field.value}
                            // onChange={(option) => field.onChange(option)}
                            // onBlur={field.onBlur}
                            options={styles}
                            field={field}
                        />} />


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


                <Button type="submit" label="Guardar" disabled={isLoading} />
            </form>

            <DevTool control={control} /> {/* set up the dev tool */}

        </div >
    )
};
export default TattooEditPageClient;