import Container from "@/components/ui/Container";

export const metadata = {
    title: {
        template: '%s | Tattuo',
        default: 'El blog de TATTUO · Los mejores consejos para tatuajes y piercing',
    },
    description: 'Encuentra en nuestro blog los mejores consejos para hacer crecer tu negocio de tatuajes y piercing. ¡Aprende a gestionar tu estudio de tatuajes!',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
        { media: '(prefers-color-scheme: dark)', color: '#000' },
    ],
    openGraph: {
        title: 'TATTUO',
        description: 'TATTUO',
        url: 'tattuo.com',
        siteName: "TATTUO's site",
        locale: 'es_ES',
        type: 'website',
        // To use your own endpoint, refer to https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation
        // Note that an official `app/` solution is coming soon.
        // images: [
        //     {
        //         url: `https://maxleiter.com/api/og?title=${encodeURIComponent(
        //             "Max Leiter's site"
        //         )}`,
        //         width: 1200,
        //         height: 630,
        //         alt: '',
        //     },
        // ],
    },
    // twitter: {
    //     title: 'Max Leiter',
    //     card: 'summary_large_image',
    //     creator: '@max_leiter',
    // },
    icons: {
        shortcut: '/images/avatar.png',
    },
    alternates: {
        types: {
            // See the RSS Feed section for more details
            // 'application/rss+xml': 'https://maxleiter.com/feed.xml',
        },
    },
}


const Layout = ({
    children
}) => {
    return (
        <Container>
            <div>
                {children}
            </div>
        </Container>
    )
};
export default Layout;