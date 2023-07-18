import { getCurrentUser } from '@/actions/getCurrentUser'
import getTattoos from '@/actions/getTattoos'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Search from '@/components/search/SearchBar'
import TattooListingGrid from '@/components/listings/TattooListingGrid'
import EmptyState from '@/components/EmptyState'
import { getStyleList } from '@/libs/getStyleList'
import { getBodyParts } from '@/libs/getBodyParts'
export const dynamic = "force-dynamic";


//TODO:
// SITEMAP
// ROBOTS.TXT
const styles = getStyleList()
const bodyParts = getBodyParts()

const filtro1 = {
    label: 'Estilos',
    value: 'style',
    options: styles
}

const filtro2 = {
    label: 'Parte del cuerpo',
    value: 'bodyPart',
    options: bodyParts
}

export default async function TattoosPage({ searchParams }) {

    const tattoos = await getTattoos(searchParams)
    const currentUser = await getCurrentUser()

    if (tattoos.length < 1) {
        return (


            <Container>
                <Search filtro1={filtro1} filtro2={filtro2} />
                <EmptyState title="No se han encontrado tatuajes con esos filtros"
                    subtitle="Modifica tus filtros para encontrar más resultados"
                    actionUrl={'/tatuajes'}
                    actionLabel={'Quitar filtros'}
                />
            </Container>
        )
    }

    return (
        <>
            <Container>
                <Search filtro1={filtro1} filtro2={filtro2} />
                <Heading title={'Tatuajes'} />
                <TattooListingGrid
                    listings={tattoos}
                    currentUser={currentUser}
                    listingType="tattoos"
                />
            </Container>
        </>
    )
}
