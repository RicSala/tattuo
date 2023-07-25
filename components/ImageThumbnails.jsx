import axios from "axios";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";


const ImageThumbnails = ({
    imageSrc,
    setValue,
}) => {

    if (!imageSrc) return null

    const imageStyle = `
        w-20 rounded-xl
    `

    if (typeof imageSrc === "string") return (
        <div className="relative inline-block">
            <Image src={imageSrc} alt="image" width={100} height={200}
                style={{ width: 'auto' }} className={imageStyle} />
            <div
                onClick={async () => {
                    // const imageToDelete = getValues("imageSrc")
                    console.log(`/api/images/${imageSrc.split("/").pop().split(".")[0]}`)
                    await axios.delete(`/api/images/${imageSrc.split("/").pop().split(".")[0]}`)
                    setValue("imageSrc", null, {
                        shouldValidate: true,
                        shouldDirty: true
                    })

                }
                }
                className="absolute right-[-0.5em] top-[-0.5em] cursor-pointer">
                <TiDelete size={25} className="
                text-primary
                "/>

            </div>
        </div>
    )

    // if imageSrs is an array, we map it and do as above
    return (
        <div className="relative inline-block">
            {imageSrc.map((image, index) => (
                <div key={image} className="relative inline-block">
                    <Image src={image} alt="image" width={100} height={200}
                        style={{ width: 'auto' }} className={imageStyle} />
                    <div
                        onClick={async () => {
                            console.log(image)
                            console.log(`/api/images/${image.split("/").pop().split(".")[0]}`)

                            await axios.delete(`/api/images/${image.split("/").pop().split(".")[0]}`)
                            setValue("image", null, {
                                shouldValidate: true,
                                shouldDirty: true
                            })

                        }
                        }
                        className="absolute right-1 top-1 cursor-pointer">
                        x
                    </div>
                </div>
            )
            )}
        </div>
    )

}



export default ImageThumbnails;