import Image from "next/image";

export default function Team({

}) {
    return (
        <section className="team py-12 lg:py-20">
            <div className="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                <div className="mb-8 lg:mb-12">
                    <h1 className="text-center text-4xl">Nuestro equipo.</h1>
                </div>

                <div className="grid grid-cols-12 gap-3 lg:gap-5">

                    <div className="card-v2 rounded col-span-12 lg:col-span-3 relative overflow-hidden">
                        <figure>
                            <div className="relative w-full min-h-[300px]">
                                <Image className="absolute top-0 left-0 object-cover" fill src="/images/hero-bg.jpeg" alt="Image description" />
                            </div>
                            <figcaption className="card-v2__caption px-3 lg:px-5 pt-5 lg:pt-8 pb-3 lg:pb-5 text-center">
                                <div className="text-lg lg:text-xl">James Powell</div>
                                <div className="mt-1 lg:mt-1.5 text-sm lg:text-base opacity-70">Designer</div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="card-v2 rounded col-span-12 lg:col-span-3 relative overflow-hidden">
                        <figure>
                            <div className="relative w-full min-h-[300px]">
                                <Image className="absolute top-0 left-0 object-cover" fill src="/images/hero-bg.jpeg" alt="Image description" />
                            </div>
                            <figcaption className="card-v2__caption px-3 lg:px-5 pt-5 lg:pt-8 pb-3 lg:pb-5 text-center">
                                <div className="text-lg lg:text-xl">James Powell</div>
                                <div className="mt-1 lg:mt-1.5 text-sm lg:text-base opacity-70">Designer</div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="card-v2 rounded col-span-12 lg:col-span-3 relative overflow-hidden">
                        <figure>
                            <div className="relative w-full min-h-[300px]">
                                <Image className="absolute top-0 left-0 object-cover" fill src="/images/hero-bg.jpeg" alt="Image description" />
                            </div>
                            <figcaption className="card-v2__caption px-3 lg:px-5 pt-5 lg:pt-8 pb-3 lg:pb-5 text-center">
                                <div className="text-lg lg:text-xl">James Powell</div>
                                <div className="mt-1 lg:mt-1.5 text-sm lg:text-base opacity-70">Designer</div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="card-v2 rounded col-span-12 lg:col-span-3 relative overflow-hidden">
                        <figure>
                            <div className="relative w-full min-h-[300px]">
                                <Image className="absolute top-0 left-0 object-cover" fill src="/images/hero-bg.jpeg" alt="Image description" />
                            </div>
                            <figcaption className="card-v2__caption px-3 lg:px-5 pt-5 lg:pt-8 pb-3 lg:pb-5 text-center">
                                <div className="text-lg lg:text-xl">James Powell</div>
                                <div className="mt-1 lg:mt-1.5 text-sm lg:text-base opacity-70">Designer</div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}