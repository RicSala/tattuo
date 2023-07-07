'use client'

import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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
            image: artist.image || "",
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

                <Input
                    id="mainImage"
                    label="Main Image"
                    disable={isLoading}
                    errors={errors}
                    required
                    register={register}
                />

                <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                    Save
                </Button>
            </form>
        </>
    )

}

export default ProfilePageClient;

