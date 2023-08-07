import { getCurrentUser } from '@/actions/getCurrentUser'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navbar/NavBar'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Link from 'next/link'

export default async function NotFound() {

    const user = await getCurrentUser()

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <NavBar currentUser={user} />
            <div className="pb-20 pt-24 w-full bg-background text-foreground flex-grow
            flex flex-col justify-center items-center gap-5
            ">
                <Heading
                    title={"No hemos encontrado lo que estás buscando"}
                    subtitle={"Navega a la página de inicio y encuentra tatuadores en tu ciudad"} />
                <div className='w-50'>
                    <Link className='w-50' href={"/"}>
                        <Button label='Empezar' />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}