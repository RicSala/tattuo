'use client'

import { Controller, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import { useState } from "react";
import Button from "../ui/Button";
import { DevTool } from "@hookform/devtools";
import RadioGroup from "../ui/RadioGroup";
import { Textarea } from "../inputs/TextArea";
import { getStyleList } from "@/libs/getStyleList";
import ImageUploadControlled2 from "../inputs/ImageUploadControlled2";
import ImageThumbnails from "../ui/ImageThumbnails";
import Stepper from "./Stepper";
import axios from "axios";
import { toast } from "react-hot-toast";
import CustomAsyncSelect from "../inputs/AsyncSelect";

//TODO: Add google analytics

const STEPS = {
    ADDRESS: 0,
    WHEN: 1,
    SIZE: 2,
    DESCRIPTION: 3,
    COLOR: 4,
    STYLE: 5,
    IMAGES: 6
}

const whenOptions = [
    { label: 'Lo antes posible', value: 'soonest' },
    { label: 'En 1 semana', value: '1week' },
    { label: 'En 2 semanas', value: '2weeks' },
    { label: 'En 1 mes', value: '1month' },
    { label: 'A largo plazo', value: 'longterm' },
]

const sizeOptions = [
    { label: 'Pequeño', value: 'small' },
    { label: 'Mediano', value: 'medium' },
    { label: 'Grande', value: 'large' },
    { label: 'Muy grande', value: 'xlarge' },
]

const colorOptions = [
    { label: 'Blanco y Negro', value: 'blackandwhite' },
    { label: 'A color', value: 'color' },
    { label: 'No lo sé aún', value: 'dontknow' }
]

const styleOptions = getStyleList()

export default function MultiStep({
    children,
    setResults,
    ...props
}) {

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.IMAGES);
    //TODO: Image to delete as in profilepageclient


    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: { errors } } = useForm({
            defaultValues: {
                // address: null,
                // when: null,
                // size: null, //TODO: Until I fix the validation issue, I'm setting a default value 
                // description: null,
                // color: null,
                // style: null,
                // images: null,
                address: 'Barcelona',
                when: 'soonest',
                size: 'medium', //TODO: Until I fix the validation issue, I'm setting a default value 
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla placeat, commodi cumque laboriosam adipisci animi perspiciatis ducimus officia aperiam quod maiores nam similique, dolore error pariatur inventore. Sit, assumenda aut?',
                color: 'color',
                style: 'Anime',
                images: 'https://picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',

            },
        });


    const onNext = async () => {
        if (step === STEPS.ADDRESS) {
            const addressIsValid = await trigger('address');
            addressIsValid && setStep((prev) => prev + 1);
        }
        if (step === STEPS.WHEN) {
            const whenIsValid = await trigger('when');
            whenIsValid && setStep((prev) => prev + 1);
        }
        if (step === STEPS.SIZE) {
            const sizeIsValid = await trigger('size');
            sizeIsValid && setStep((prev) => prev + 1);
        }

        if (step === STEPS.DESCRIPTION) {
            const descriptionIsValid = await trigger('description');
            descriptionIsValid && setStep((prev) => prev + 1);
        }

        if (step === STEPS.COLOR) {
            const colorIsValid = await trigger('color');
            colorIsValid && setStep((prev) => prev + 1);
        }

        if (step === STEPS.STYLE) {
            const styleIsValid = await trigger('style');
            styleIsValid && setStep((prev) => prev + 1);
        }



    };

    const onBack = () => {
        if (step !== STEPS.ADDRESS) {
            setStep((prev) => prev - 1);
        }
    };


    const onSubmit = (data) => {
        console.log(data);
        setIsLoading(true);
        toast.success('Solicitud enviada');
        axios.post('/api/artists/finder', data)
            .then(res => {
                console.log(res);
                setIsLoading(false);
                toast.success(`Artistas seleccionados`);
                setResults(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                toast.error('Error al enviar la información');
            }
            )

    };

    const onError = (errors, e) => console.log(errors, e);





    return (
        <>
            <Stepper steps={STEPS} activeStep={step} setStep={setStep} />

            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <p>STEP: {step}</p>


                <>

                    <div className={`
                     ${step === STEPS.ADDRESS ? `block` : `hidden`}
                    `}>
                        <p className="text-lg font-semibold">Información básica</p>
                        {
                            errors.address && (<p className="text-sm text-rose-500">
                                {errors.address.message}
                            </p>)
                        }


                        <Controller
                            name="address"
                            control={control}
                            rules={{
                                required: 'Campo requerido',
                            }}
                            render={({ field }) =>
                                <CustomAsyncSelect
                                    resources="cities"
                                    field={field}
                                    placeholder="Selecciona tu ciudad"
                                    noOptionsMessage={() => "Teclea para buscar tu ciudad"}
                                />
                            } />

                    </div>

                    <div className={` ${step === STEPS.WHEN ? `block` : `hidden`}`}>
                        <p className="text-lg font-semibold">¿Cuándo tienes pensado tatuarte?</p>
                        {
                            errors.when && (<p className="text-sm text-rose-500">
                                {errors.when.message}
                            </p>)
                        }
                        <RadioGroup
                            id="when"
                            name="when"
                            control={control}
                            trigger={trigger}
                            rules={{ required: true }}
                            options={whenOptions}
                        />
                    </div>


                    <div className={` ${step === STEPS.SIZE ? `block` : `hidden`}`}>
                        <p className="text-lg font-semibold">¿Cuál es el tamaño aproximado del tatuaje?</p>
                        {
                            errors.size && (<p className="text-sm text-rose-500">
                                {errors.size.message}
                            </p>)
                        }
                        <RadioGroup
                            id="size"
                            name="size"
                            control={control}
                            trigger={trigger}
                            rules={{ required: 'Campo requerido' }}
                            options={sizeOptions}
                        />
                    </div>

                    <div className={` ${step === STEPS.DESCRIPTION ? `block` : `hidden`}`}>
                        <p className="text-lg font-semibold">Descripción</p>
                        {
                            errors.description && (<p className="text-sm text-rose-500">{
                                errors.description.message
                            }</p>)
                        }
                        <Textarea
                            id="description"
                            label="Descripción"
                            {...register('description', {
                                required: 'Campo requerido',
                                minLength: {
                                    value: 50,
                                    message: 'Mínimo 50 caracteres'
                                },
                            })} />
                    </div>

                    <div className={` ${step === STEPS.COLOR ? `block` : `hidden`}`}>
                        <p className="text-lg font-semibold">¿Qué colores te gustaría que tuviera?</p>
                        {
                            errors.color && (<p className="text-sm text-rose-500">Campo requerido</p>)
                        }
                        <RadioGroup
                            id="color"
                            name="color"
                            control={control}
                            trigger={trigger}
                            rules={{ required: 'Campo requerido' }}
                            options={colorOptions}
                        />
                    </div>

                    <div className={` ${step === STEPS.STYLE ? `block` : `hidden`}`}>
                        <p className="text-lg font-semibold">¿Qué estilo te gustaría?</p>
                        {
                            errors.style && (<p className="text-sm text-rose-500">Campo requerido</p>)
                        }
                        <RadioGroup
                            id="style"
                            name="style"
                            options={styleOptions}
                            control={control}
                            trigger={trigger}
                            rules={{ required: 'Campo requerido' }}

                        />
                    </div>

                    <div className={` ${step === STEPS.IMAGES ? `block` : `hidden`}`}>
                        <p className="text-lg font-semibold">Imágenes de referencia</p>
                        {
                            errors.images && (<p className="text-sm text-rose-500">Campo requerido</p>)
                        }
                        <ImageUploadControlled2
                            id="images"
                            name="images"
                            maxFiles={5}
                            control={control}
                            trigger={trigger}
                            rules={{ required: 'Campo requerido' }}
                        />

                        <ImageThumbnails
                            imageSrc={getValues("images")}
                            setValue={setValue}
                            fieldName="images"
                        />
                    </div>




                </>
                <div className={`
                    flex
                    flex-row
                    ${step === STEPS.ADDRESS ? `justify-end` : `justify-between`}
                    `}>
                    {step !== STEPS.ADDRESS && (
                        <div className="flex justify-end">
                            <Button onClick={onBack} label={'Anterior'} />
                        </div>
                    )}
                    {step !== STEPS.IMAGES && (
                        <div className="">
                            <Button onClick={onNext} label={'Siguiente'} className={''} />
                        </div>
                    )}
                </div>
                {step === STEPS.IMAGES && (
                    <div className="">
                        <Button type="submit"
                            label={isLoading ? 'Seleccionando...' : 'Enviar'}
                            className={''}
                            disabled={isLoading}
                        />
                    </div>
                )}

            </form>
            {/* <DevTool control={control} /> */}
        </>



    );
}