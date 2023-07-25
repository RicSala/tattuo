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
            { label: "Preguntas frecuentes", url: "/faq" },
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
            { label: "Tatuajes de Mariposas", url: "/tatuadores-mariposas" },
            { label: "Tatuajes de Mariposas", url: "/tatuadores-mariposas" },
            { label: "Tatuajes de Mariposas", url: "/tatuadores-mariposas" },
            { label: "Tatuajes de Mariposas", url: "/tatuadores-mariposas" },
            { label: "Tatuajes de Mariposas", url: "/tatuadores-mariposas" },
        ],

    },
]


function Footer({
}) {

    return (
        // <Container>
        <div className="w-full bg-background shadow-sm text-foreground border-t-[1px]">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex justify-between items-start">
                        {
                            footterMenu.map((menu, index) => (
                                <div key={index} className="flex flex-col">
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
                </Container>
            </div>
            {/* <Categories /> */}
        </div>
        // </Container>
    )


}

export default Footer;