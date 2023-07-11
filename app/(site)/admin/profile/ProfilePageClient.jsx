'use client'
import axios from "axios";
import { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import ImageUpload from "@/components/inputs/ImageUpload";
import Input from "@/components/inputs/Input";
import { getStyleList } from "@/libs/getStyleList";
import { getCities } from "@/libs/getCities";
import Image from "next/image";

const estilos = getStyleList()
const cities = getCities()

const ProfilePageClient = ({
    artist
}) => {

    const stylesArray = artist.styles.map(style => {
        return {
            label: style,
            value: style
        }
    })

    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const { setError, clearErrors, control, register, handleSubmit, setValue, getValues, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            artisticName: artist.artisticName || "",
            email: artist.email || "",
            bio: artist.bio || "",
            location: artist.location || "",
            images: artist.images || [],
            mainImage: artist.mainImage || "",
            styles: stylesArray || "",
            minWorkPrice: artist.minWorkPrice || null,
            phone: artist.phone || "",
            pricePerHour: artist.pricePerHour || null,
            pricePerSession: artist.pricePerSession || null,
            facebook: artist.facebook || "",
            instagram: artist.instagram || "",
            tiktok: artist.tiktok || "",
            twitter: artist.twitter || "",
            website: artist.website || "",
            youtube: artist.youtube || "",

        }
    })

    const watchMainImage = watch("mainImage")
    const watchImages = watch("images")


    // workaround to avoid console error
    useEffect(() => setIsMounted(true), []);



    // Clear errors when the user uploads (otherwise error is permanent)
    useEffect(() => {
        clearErrors("mainImage")
        clearErrors("images")
    }, [watchMainImage, watchImages, clearErrors])

    // Validation for the watched fields
    useEffect(() => {
        // if no main image, set an error message
        if (!watchMainImage) {
            setError("mainImage", {
                type: "manual",
                message: "Imagen principal requerida"
            })
        }

        // if less than 3 images, set an error message
        if (watchImages.length < 3) {
            setError("images", {
                type: "manual",
                message: "Sube 3 imagenes"
            })
        }
    }, [setError, watchImages.length, watchMainImage])


    const handleDeleteImage = async (image) => {
        const newImages = getValues("images").filter(img => img !== image)
        setValue("images", newImages)
        const imageId = image.split("/").pop().split(".")[0]
        console.log("imageId", imageId)
        await axios.delete(`/api/images/${imageId}`)
    }

    const handleDeleteMainImage = async (image) => {
        setValue("mainImage", undefined)
        const imageId = image.split("/").pop().split(".")[0]
        console.log("imageId", imageId)
        await axios.delete(`/api/images/${imageId}`)
    }


    const onSubmit = async (data) => {

        setIsLoading(true)

        axios.put(`/api/artists/${artist.id}`, data)
            .then(res => {
                toast.success("Profile updated")
            })
            .catch(err => {
                console.log(err)
                toast.error("Error updating profile")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }



    const customSetValue = (field, value) => {
        setValue(field, value, {
            shouldValidate: true, // By default, setting the field value using setValue does not trigger validation. However, if you set shouldValidate to true, it will trigger validation for that field.
            shouldDirty: true,  // Marking a field as dirty means that its value has changed from the initial/default value
            shouldTouch: true, // Marking a field as touched means that the user has interacted with the field, even if it was not changed
        });
    }



    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>

                <Input
                    id="artisticName"
                    label="Nombre artistico"
                    disable={isLoading}
                    errors={errors}
                    required
                    register={register}
                />

                <Input
                    id="email"
                    type="email"
                    label="Email"
                    disable={isLoading}
                    errors={errors}
                    required='Campo requerido'
                    register={register}
                />
                <Input
                    id="bio"
                    label="Bio"
                    disable={isLoading}
                    errors={errors}
                    required='Campo requerido'
                    validation={{
                        maxLength: { value: 500, message: "Máximo 500 caracteres" }
                    }}
                    register={register}
                />

                <Input
                    id="minWorkPrice"
                    label="Precio mínimo"
                    disable={isLoading}
                    errors={errors}
                    required='Campo requerido'
                    register={register}
                    formatPrice
                />

                <Input
                    id="pricePerHour"
                    label="Precio por hora"
                    disable={isLoading}
                    errors={errors}
                    required='Campo requerido'
                    register={register}
                    formatPrice
                />

                <Input
                    id="pricePerSession"
                    label="Precio por sesion"
                    disable={isLoading}
                    errors={errors}
                    required='Campo requerido'
                    register={register}
                    formatPrice
                />


                {/* SOCIAL PROFILES */}

                <Input
                    id="facebook"
                    label="Facebook"
                    disable={isLoading}
                    errors={errors}
                    register={register}
                />

                <Input
                    id="instagram"
                    label="Instagram"
                    disable={isLoading}
                    errors={errors}
                    register={register}
                />

                <Input
                    id="tiktok"
                    label="Tiktok"
                    disable={isLoading}
                    errors={errors}
                    register={register}
                />

                <Input
                    id="twitter"
                    label="Twitter"
                    disable={isLoading}
                    errors={errors}
                    register={register}
                />

                <Input
                    id="website"
                    label="Website"
                    disable={isLoading}
                    errors={errors}
                    register={register}
                />

                <Input
                    id="youtube"
                    label="Youtube"
                    disable={isLoading}
                    errors={errors}
                    register={register}
                />

                <Input
                    id="phone"
                    label="Telefono"
                    disable={isLoading}
                    errors={errors}
                    register={register}
                />





                {isMounted &&
                    <Controller
                        name="location"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) =>
                            <CustomSelect
                                field={field} options={cities}
                            />}
                    />
                }


                {
                    errors.mainImage &&
                    <div className="text-red-500">
                        {errors.mainImage.message}
                    </div>
                }

                <ImageUpload
                    value={watchMainImage}
                    onChange={(value) => customSetValue("mainImage", value)}
                />
                {
                    watchMainImage &&
                    <div>
                        <div className="relative inline-block">
                            <Image src={watchMainImage} alt="image" width={100} height={100} />
                            <div
                                onClick={() => handleDeleteMainImage(watchMainImage)}
                                className="absolute right-1 top-1 cursor-pointer">
                                x
                            </div>
                        </div>
                    </div>}


                {
                    errors.images &&
                    <div className="text-red-500">
                        {errors.images.message}
                        {watchImages.length}
                    </div>
                }
                <ImageUpload
                    value={watchImages}
                    onChange={(value) => {
                        return (
                            customSetValue("images", getValues("images").concat(value)))
                    }}
                />

                <div className="flex flex-row gap-3">
                    {
                        // for each image in the array, render an image upload component
                        getValues("images").map((image, index) => {
                            return (
                                <div key={image}>
                                    <div key={image} className="relative">
                                        <Image src={image} alt="image" width={100} height={100} />
                                        <div
                                            onClick={() => handleDeleteImage(image)}
                                            className="absolute right-1 top-1 cursor-pointer">
                                            x
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {
                    errors.styles &&
                    <div className="text-red-500">
                        {errors.styles.message}
                    </div>

                }

                {
                    isMounted &&
                    <Controller
                        name="styles"
                        control={control}
                        rules={{
                            required: true,
                            // max lenth of the array is 3
                            validate: (value) => value.length <= 3 || "Máximo 3 estilos"
                        }}
                        render={({ field }) =>
                            <CustomSelect
                                isMulti
                                field={field} options={estilos}
                            />}
                    />
                }

                <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                    Save
                </Button>


            </form>
        </>
    )

}

export default ProfilePageClient;

