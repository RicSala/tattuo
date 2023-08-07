'use client'

import axios from "axios";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


import Button from "@/components/ui/Button";
import Input from "@/components/inputs/Input";
import ImageUploadControlled2 from "@/components/inputs/ImageUploadControlled2";
import CustomAsyncSelect from "@/components/inputs/AsyncSelect";
import { DevTool } from "@hookform/devtools";
import CustomSelect from "@/components/inputs/CustomSelect";
import ImageThumbnails from "@/components/ui/ImageThumbnails";
import HeadingWithButton from "@/components/ui/HeadingWithButton";
import { Textarea } from "@/components/inputs/TextArea";

// Not sure I want to use this
const inputFields = [
    { id: 'artisticName', label: 'Nombre artistico', required: true },
    { id: 'email', type: 'email', label: 'Email', required: 'Campo requerido' },
    { id: 'bio', label: 'Bio', required: 'Campo requerido', validation: { maxLength: { value: 500, message: "Máximo 500 caracteres" } } },
    { id: 'minWorkPrice', label: 'Precio mínimo', required: 'Campo requerido', formatPrice: true },
    { id: 'pricePerHour', label: 'Precio por hora', required: 'Campo requerido', formatPrice: true },
    { id: 'pricePerSession', label: 'Precio por sesion', required: 'Campo requerido', formatPrice: true },
    { id: 'facebook', label: 'Facebook' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'tiktok', label: 'Tiktok' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'website', label: 'Website' },
    { id: 'youtube', label: 'Youtube' },
    { id: 'phone', label: 'Telefono' },
];

const ProfilePageClient = ({
    artist,
    styles,
}) => {



    const [isLoading, setIsLoading] = useState(false)
    // create a ref with a list of the images when the component mounts
    // so we delete them only when the form is submitted
    // otherwise we would delete them when they click "x" (and maybe they change their mind)
    // and we would not delete them when they just change the image
    const imagesRef = useRef(artist.images)
    const mainImageRef = useRef(artist.mainImage)

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: { errors } } = useForm({

            defaultValues: {
                artisticName: artist?.artisticName || "",
                email: artist.email || "",
                bio: artist.bio || "",
                city: artist.city || "",
                images: artist.images || [],
                mainImage: artist.mainImage || "",
                styles: artist.styles || "",
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


    const onSubmit = async (data) => {

        setIsLoading(true)

        const imagesToDelete = imagesRef.current.filter(img => !data.images.includes(img))
        const mainImageToDelete = mainImageRef.current !== data.mainImage ? mainImageRef.current : null

        const arrayToDelete = [...imagesToDelete, mainImageToDelete].filter(img => img)

        // delete images from cloudinary
        if (arrayToDelete.length > 0) {
            for (const image of arrayToDelete) {
                await axios.delete(`/api/images/${image.split("/").pop().split(".")[0]}`)
            }
        }

        // set the ref to the new images
        imagesRef.current = data.images
        mainImageRef.current = data.mainImage

        axios.put(`/api/artists/${artist.id}`, data)
            .then(res => {
                toast.success("Profile updated")
            })
            .catch(err => {
                console.log("ERROR - ProfilePageClient", err)
                toast.error("Error updating profile")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const onError = (errors, e) => {
        toast.error("Por favor, revisar el formulario")
    };



    return (
        <>

            <HeadingWithButton title={'Editar perfil'} actionLabel={'Cancelar'} buttonUrl={'/admin/tatuajes'} />
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col mx-auto ">
                <div className="flex flex-row gap-10 justify-center flex-wrap">
                    <div className="w-full md:w-1/2">

                        {/* BASIC INFO */}
                        <div className="mb-5">
                            <p className="text-lg font-semibold">Información básica</p>
                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
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
                                    id="phone"
                                    label="Telefono"
                                    disable={isLoading}
                                    errors={errors}
                                    register={register}
                                />


                                <Textarea
                                    id="bio"
                                    label="Bio"
                                    errors={errors}
                                    required='Campo requerido'
                                    validation={{
                                        maxLength: { value: 500, message: "Máximo 500 caracteres" }
                                    }}
                                    className="bg-white"
                                    {...register('bio', {
                                        required: 'Campo requerido',
                                        minLength: {
                                            value: 50,
                                            message: 'Mínimo 50 caracteres'
                                        },
                                    })}
                                />

                                <Controller
                                    name="city"
                                    control={control}
                                    rules={{
                                        required: 'Campo requerido',
                                    }}
                                    render={({ field }) =>
                                        <CustomAsyncSelect
                                            resources="cities"
                                            field={field}
                                        />
                                    } />


                                <Controller
                                    name="styles"
                                    control={control}
                                    rules={{
                                        required: "Debes seleccionar un estilo",
                                        // max lenth of the array is 3
                                        validate: (value) => value.length <= 3 || "Máximo 3 estilos"
                                    }}
                                    render={({ field }) =>
                                        <CustomSelect
                                            isMulti={true}
                                            options={styles}
                                            field={field}
                                        />} />
                            </div>
                        </div>


                        {/* PRICES */}
                        <div className="mb-5">
                            <p className="text-lg font-semibold">Precios</p>
                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">

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


                            </div>
                        </div>

                        {/* SOCIAL PROFILES */}
                        <div className="mb-5">
                            <p className="text-lg font-semibold">Redes sociales</p>
                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">

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
                            </div>
                        </div>



                    </div>

                    <div className="max-w-md">

                        <ImageUploadControlled2
                            control={control}
                            maxFiles={1}
                            name="mainImage"
                            trigger={trigger}
                            errors={errors}
                            rules={{ required: 'Campo requerido' }}
                        />

                        <ImageThumbnails
                            imageSrc={getValues("mainImage")}
                            setValue={setValue}
                            fieldName="mainImage"
                        />

                        {
                            errors.images &&
                            <div className="text-red-500">
                                {errors.images.message}
                            </div>
                        }

                        <ImageUploadControlled2
                            control={control}
                            maxFiles={3}
                            name="images"
                            trigger={trigger}
                            errors={errors}
                            rules={{
                                // at least 3 images required
                                validate: (value) => value.length >= 3 || "Mínimo 3 imágenes"
                            }}
                        />
                        <ImageThumbnails
                            imageSrc={getValues("images")}
                            setValue={setValue}
                            fieldName="images"

                        />



                    </div>
                </div>
                <div className="flex flex-row justify-end">
                    <div className="">
                        <Button type="submit" isLoading={isLoading} disabled={isLoading}
                            label={isLoading ? "Guardando..." : "Guardar"} />

                    </div>
                </div>
            </form>
            {/* Dev tools for React Hook Forms  */}
            {/* <DevTool control={control} /> */}

        </>
    )

}

export default ProfilePageClient;

