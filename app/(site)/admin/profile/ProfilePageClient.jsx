'use client'

import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import ImageUploadControlled2 from "@/components/inputs/ImageUploadControlled2";
import CustomAsyncSelect from "@/components/inputs/AsyncSelect";
import { DevTool } from "@hookform/devtools";
import CustomSelect from "@/components/CustomSelect";
import ImageThumbnails from "@/components/ImageThumbnails";
import HeadingWithButton from "@/components/HeadingWithButton";

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

    console.log("ProfilePageClient - artist", artist)

    const [isLoading, setIsLoading] = useState(false)

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
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <>


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

                </>


                <ImageUploadControlled2
                    control={control}
                    maxFiles={1}
                    name="mainImage"
                    trigger={trigger}
                    errors={errors}
                    rules={{ required: 'Campo requerido' }}
                />

                <ImageThumbnails imageSrc={getValues("mainImage")}
                    setValue={setValue}
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
                <ImageThumbnails imageSrc={getValues("images")}
                    setValue={setValue}
                />







                {
                    errors.styles &&
                    <div className="text-red-500">
                        {errors.styles.message}
                    </div>

                }


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
                            // The next three lines are the same as doing: ...field
                            // value={field.value}
                            // onChange={(option) => field.onChange(option)}
                            // onBlur={field.onBlur}
                            options={styles}
                            field={field}
                        />} />

                <Button type="submit" isLoading={isLoading} disabled={isLoading}
                    label={isLoading ? "Guardando..." : "Guardar"} />


            </form>
            {/* Dev tools for React Hook Forms  */}
            {/* <DevTool control={control} /> */}

        </>
    )

}

export default ProfilePageClient;

