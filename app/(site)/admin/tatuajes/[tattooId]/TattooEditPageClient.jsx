'use client'

import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import ImageUpload from "@/components/inputs/ImageUpload";
import Input from "@/components/inputs/Input";
import { getBodyParts } from "@/libs/getBodyParts";
import { getStyleList } from "@/libs/getStyleList";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const TattooEditPageClient = ({
    tattoo
}) => {


    const { setError, clearErrors, control, register, handleSubmit, setValue, getValues, watch, reset, formState: { errors }, formState } = useForm({
        defaultValues: {
            title: tattoo.title,
            description: tattoo.description,
            imageSrc: tattoo.imageSrc,
            style: {
                value: tattoo.style || "",
                label: tattoo.style?.replace(/_/g, " ") || ""
            }, //REVIEW: is there a way to only send the enum?
            tattooId: tattoo.id,
            bodyPart: {
                value: tattoo.bodyPart || "",
                label: tattoo.bodyPart?.replace(/_/g, " ") || ""
            }

        }
    });

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // this is how we link the input with the form using a controller
    const { field } = useController({ name: "style", control, rules: { required: true } })

    // console.log("FIELD", useController({ name: "style", control }))

    //REVIEW: Interesting to see what it returns. That's what is spreaded on each input
    // console.log(register("name"))

    const styles = getStyleList();
    const bodyParts = getBodyParts();
    const watchImage = watch("imageSrc")

    // Clear errors when the user uploads (otherwise error is permanent)
    useEffect(() => {
        if (watchImage) {
            clearErrors("imageSrc")
        }
    }, [clearErrors, watchImage])

    // When watchImage changes, check if the form has been submitted 
    useEffect(() => {

        if (!watchImage
            && formState.isSubmitted
        ) {
            setError("imageSrc", {
                type: "manual",
                message: "Sube tu mejor foto del tatuaje"
            })
        }
    }, [formState.isSubmitted, setError, watchImage])



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

    const customSetValue = (field, value) => {
        setValue(field, value, {
            shouldValidate: true, // By default, setting the field value using setValue does not trigger validation. However, if you set shouldValidate to true, it will trigger validation for that field.
            shouldDirty: true,  // Marking a field as dirty means that its value has changed from the initial/default value
            shouldTouch: true, // Marking a field as touched means that the user has interacted with the field, even if it was not changed
        });

    }

    const handleStyleChange = (option) => {

        field.onChange(option)
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
                <ImageUpload
                    value={watchImage}
                    onChange={(value) => customSetValue("imageSrc", value)}
                />
                {
                    watchImage &&
                    <div>
                        <div className="relative inline-block">
                            <Image src={watchImage} alt="image" width={100} height={100} />
                            <div
                                onClick={() => handleDeleteMainImage(watchImage)}
                                className="absolute right-1 top-1 cursor-pointer">
                                x
                            </div>
                        </div>
                    </div>}

                <Controller
                    name="style"
                    control={control}
                    rules={{
                        required: true,
                        // max lenth of the array is 3
                        // validate: (value) => value.length <= 3 || "Máximo 3 estilos"
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            isMulti={false}
                            field={field} options={styles}
                        />}
                />
                <Controller
                    name="bodyPart"
                    control={control}
                    rules={{
                        required: true,
                        // max lenth of the array is 3
                        // validate: (value) => value.length <= 3 || "Máximo 3 estilos"
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            isMulti={false}
                            field={field} options={bodyPartsOptions}
                        />}
                />



                <Button type="submit">Guardar</Button>


            </form>
        </div >
    )
};
export default TattooEditPageClient;