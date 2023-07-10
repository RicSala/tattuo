'use client'

import Button from "@/components/Button";
import ImageUpload from "@/components/inputs/ImageUpload";
import Input from "@/components/inputs/Input";
import CustomSelect from "@/components/inputs/StyleSelect";
import { getStyleList } from "@/libs/getStyleList";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const estilos = getStyleList()

const ProfilePageClient = ({
    artist
}) => {


    const [isLoading, setIsLoading] = useState(false)

    const { setError, clearErrors, control, register, handleSubmit, setValue, getValues, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            artisticName: artist.artisticName || "",
            email: artist.email || "",
            bio: artist.bio || "",
            location: artist.location || "",
            image: artist.images[0] || "",
            mainImage: artist.mainImage || "",
            styles: artist.styles || "",
            maxPrice: artist.maxPrice || "",
            phone: artist.phone || "",
            pricePerHour: artist.pricePerHour || "",
            pricePerSession: artist.pricePerSession || "",
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
                console.log(err)
                toast.error("Error updating profile")
            })
            .finally(() => {
                setIsLoading(false)
                // reset

            })
    }


    const image = watch("mainImage")

    const customSetValue = (field, value) => {
        setValue(field, value, {
            shouldValidate: true, // By default, setting the field value using setValue does not trigger validation. However, if you set shouldValidate to true, it will trigger validation for that field.
            shouldDirty: true,  // Marking a field as dirty means that its value has changed from the initial/default value
            shouldTouch: true, // Marking a field as touched means that the user has interacted with the field, even if it was not changed
        });

    }

    return (
        <>

            trying to edit {artist.name}

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
                    id="bio"
                    label="Bio"
                    disable={isLoading}
                    errors={errors}
                    required
                    register={register}
                />

                <Input
                    id="location"
                    label="Location"
                    disable={isLoading}
                    errors={errors}
                    required
                    register={register}
                />

                <Input
                    id="image"
                    label="Image"
                    disable={isLoading}
                    errors={errors}
                    required
                    register={register}
                />

                <CustomSelect
                    options={estilos}
                />
                <ImageUpload
                    value={image}
                    onChange={(value) => customSetValue("mainImage", value)}
                />


                <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                    Save
                </Button>
            </form>
        </>
    )

}

export default ProfilePageClient;

