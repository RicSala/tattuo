import Logo from "../navbar/Logo";
import Container from "../ui/Container";
import Link from "next/link";


const footterMenu = [
    {
        title: "Descubrir",
        items: [
            { label: "Tatuadores", url: "/tatuadores" },
            { label: "Tatuajes", url: "/tatuajes" },
            { label: "Nuestro Blog", url: "/blog" },
        ],
    },
    {
        title: "Sobre Tattuo",
        items: [
            { label: "Colaboraciones", url: "/colaboraciones" },
            { label: "Quiénes somos", url: "/quienes-somos" },
            { label: "Preguntas frecuentes", url: "/preguntas-frecuentes" },
            { label: "Contacto", url: "/contacto" },
        ],
    },
    {
        title: "Tatuadores en tu ciudad",
        items: [
            { label: "Tatuadores en Madrid", url: "/tatuadores/madrid" },
            { label: "Tatuadores en Barcelona", url: "/tatuadores/barcelona" },
            { label: "Tatuadores en Valencia", url: "/tatuadores/valencia" },
            { label: "Tatuadores en Zaragoza", url: "/tatuadores/zaragoza" },
        ],
    },
    {
        title: "Principales temáticas",
        items: [
            { label: "Tatuajes de Mariposas", url: "/tatuajes/mariposas" },
            { label: "Tatuajes de Tribales", url: "/tatuajes/tribales" },
            { label: "Tatuajes de Mariposas", url: "/tatuajes/mariposas" },
            { label: "Tatuajes de Mariposas", url: "/tatuajes/mariposas" },
            { label: "Tatuajes de Mariposas", url: "/tatuajes/mariposas" },
        ],

    },
]


function Footer({
}) {

    return (
        <footer className="w-full bg-background shadow-sm text-foreground border-t-[1px]">
            <Container>
                <div className="mx-auto grid max-w-screen-xl gap-y-8 
                gap-x-12
                px-4 py-10
                sm:grid-cols-2
                md:grid-cols-4
                xl:grid-cols-4
                xl:px-10">
                    {
                        footterMenu.map((menu, index) => (
                            <div key={index} className="flex flex-col">
                                {
                                    index === 0 &&
                                    <div className="mb-2 flex h-12 items-center space-x-2">
                                        <Logo />
                                    </div>
                                }
                                <h3 className="text-lg font-bold mb-2">{menu.title}</h3>
                                <ul className="flex flex-col">
                                    {
                                        menu.items.map((item, index) => (
                                            <li key={index} className="mb-1">
                                                {<Link href={item.url}>{item.label}</Link>}
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        ))
                    }
                </div>
                {/* <Categories /> */}
            </Container>
        </footer>
    )


}

export default Footer;