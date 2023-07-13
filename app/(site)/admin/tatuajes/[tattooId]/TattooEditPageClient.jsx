'use client'

import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import ImageUploadControlled from "@/components/inputs/ImageUploadControlled";
import Input from "@/components/inputs/Input";
import { getBodyParts } from "@/libs/getBodyParts";
import { getStyleList } from "@/libs/getStyleList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const TattooEditPageClient = ({
    tattoo
}) => {


    const { setError, clearErrors, control, register, handleSubmit, setValue, getValues, watch, reset, formState: { errors }, formState } = useForm({
        defaultValues: {
            title: tattoo.title,
            description: tattoo.description,
            imageSrc: tattoo.imageSrc,
            style: tattoo.style ?
                { value: tattoo.style, label: tattoo.style.replace(/_/g, " ") }
                : null,
            tattooId: tattoo.id,
            bodyPart: {
                value: tattoo.bodyPart || "",
                label: tattoo.bodyPart?.replace(/_/g, " ") || ""
            },

        }
    });

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    //REVIEW: Interesting to see what it returns. That's what is spreaded on each input
    // console.log(register("name"))

    const styles = getStyleList();
    const bodyParts = getBodyParts();

    const bodyPartsOptions = bodyParts.map(bodyPart => ({
        value: bodyPart.value,
        label: bodyPart.label
    }));


    const onSubmit = async (data) => {

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
                        console.log(field);
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
                        validate: (value) => value.length <= 3 || "Máximo 3 estilos"
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            isMulti={true}
                            // The next three lines are the same as doing: ...field
                            value={field.value}
                            onChange={(option) => field.onChange(option)}
                            onBlur={field.onBlur}
                            options={styles}
                        />} />


                <Controller
                    name="bodyPart"
                    control={control}
                    rules={{
                        required: "Debes seleccionar una parte del cuerpo"
                        // max lenth of the array is 3
                        // validate: (value) => value.length <= 3 || "Máximo 3 estilos"
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            isMulti={false}
                            // The next three lines are the same as doing: ...field
                            value={field.value}
                            onChange={(option) => field.onChange(option)}
                            onBlur={field.onBlur}
                            options={bodyPartsOptions}
                        />} />

                <Button type="submit" label="Guardar" disabled={isLoading} />
            </form>
        </div >
    )
};
export default TattooEditPageClient;