'use client'

import { Controller, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import { useState } from "react";
import Button from "../ui/Button";
import { DevTool } from "@hookform/devtools";
import RadioGroup from "../ui/RadioGroup";



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

export default function MultiStep({
    children,
    ...props
}) {

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.ADDRESS);




    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: { errors } } = useForm({
            defaultValues: {
                address: null,
                when: null,
                size: 'medium', //TODO: Until I fix the validation issue, I'm setting a default value 
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


        console.log('invalid');


    };

    const onBack = () => {
        if (step !== STEPS.ADDRESS) {
            setStep((prev) => prev - 1);
        }
    };


    const onSubmit = (data) => {
        console.log(data);

        if (step !== STEPS.IMAGES) {
            // We don't submit yet, just go to the next step

        }
    };

    const onError = (errors, e) => console.log(errors, e);

    const body = () => {

        switch (step) {

            case STEPS.ADDRESS: {
                return (
                    <>

                        <p className="text-lg font-semibold">Información básica</p>

                        <Input
                            id="address"
                            label="Dirección"
                            disable={isLoading}
                            errors={errors}
                            required={true}
                            register={register}
                        />
                    </>
                )
            }

            //TODO: For some reason, validation is not working on the second radio group...
            // it's not the first time I have this issue
            case STEPS.SIZE: {
                return (
                    <>
                        <p className="text-lg font-semibold">¿Cuál es el tamaño aproximado del tatuaje?</p>
                        {
                            errors.size && (<p className="text-sm text-rose-500">Campo requerido</p>)
                        }
                        <RadioGroup
                            id="size"
                            name="size"
                            control={control}
                            trigger={trigger}
                            rules={{ required: true }}
                            options={sizeOptions}
                        />
                    </>
                )
            }

            case STEPS.WHEN: {
                return (
                    <>
                        <p className="text-lg font-semibold">¿Cuándo tienes pensado tatuarte?</p>
                        {
                            errors.when && (<p className="text-sm text-rose-500">Campo requerido</p>)
                        }
                        <RadioGroup
                            id="when"
                            name="when"
                            control={control}
                            trigger={trigger}
                            rules={{ required: 'Campo requerido' }}
                            options={whenOptions}
                        />
                    </>
                )
            }



            case STEPS.DESCRIPTION: {
                return (
                    <>
                        <p className="text-lg font-semibold">Descripción</p>
                        <Input
                            id="description"
                            label="Descripción"
                            disable={isLoading}
                            errors={errors}
                            required={true}
                            register={register}
                        />
                    </>
                )
            }


            case STEPS.COLOR: {
                return (
                    <>
                        <p className="text-lg font-semibold">¿Qué colores te gustaría que tuviera?</p>
                        <Input
                            id="color"
                            label="Colores"
                            disable={isLoading}
                            errors={errors}
                            required={true}
                            register={register}
                        />
                    </>
                )

            }

            case STEPS.STYLE: { }

            case STEPS.IMAGES: { }

            default:
                return null;

        }

    }


    return (
        <>

            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <p>STEP: {step}</p>
                {body()}

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

            </form>
            {/* <DevTool control={control} /> */}
        </>



    );
}