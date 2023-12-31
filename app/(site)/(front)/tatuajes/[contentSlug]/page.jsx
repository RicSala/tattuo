import { getCurrentUser } from '@/actions/getCurrentUser'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Search from '@/components/search/SearchBar'
import EmptyState from '@/components/ui/EmptyState'
import { getStyleList } from '@/libs/getStyleList'
import { getBodyParts } from '@/libs/getBodyParts'
import ListingGridWithInfinite from '@/components/listings/ListingGridWithInfinite'
import TattooCard from '@/components/listings/TattooCard'
import { getTattoos } from '@/actions/getTattoos'
import { Josefin_Sans } from 'next/font/google'
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

const endpoint = 'http://localhost:3000/api/tattoos'
const sizePerPage = 10
const numberOfPagesToLoad = 1
const initialDataSize = numberOfPagesToLoad * sizePerPage

export default async function TattoosPage({ params, searchParams }) {



    console.log("SLUG", params)
    console.log("search", searchParams.freeSearch)

    // This is a bit hacky but...it works...
    const filter = params.contentSlug ? { contentSlug: params.contentSlug } : null
    searchParams.contentSlug = params.contentSlug

    const serverLoadedTattoos = await getTattoos(
        searchParams,
        0,
        initialDataSize
    )


    const currentUser = await getCurrentUser()

    if (serverLoadedTattoos.length < 1) {
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
        <Container>
            <Search filtro1={filtro1} filtro2={filtro2} />
            <Heading title={'Tatuajes'} />
            <ListingGridWithInfinite // to render an infinite scroll we need...
                initialData={serverLoadedTattoos} // the initial data coming from the server
                sizePerPage={sizePerPage} // the size of each page
                endpoint={endpoint}  // the endpoint to fetch more data in a client component
                Component={TattooCard} // the component to render for each item
                keyProp="tattoo" // the key prop to use to identify each item
                currentUser={currentUser} // the current user to check if the user is logged in
                filter={filter}
            />
        </Container>
    )
}
