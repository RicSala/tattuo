import Link from "next/link";
import Container from "../ui/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";


async function NavBar({
    currentUser,
}) {

    // Create a navBar component that will be used in the layout.js file
    return (
        // <Container>
        <div>

            <div className="fixed w-full bg-background shadow-sm text-foreground z-40">
                <div className="py-4 border-b-[1px] border-border">
                    <Container>
                        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                            <div className="flex flex-row justify-between items-center gap-5">
                                <Logo />
                                <div className="hidden md:flex md:gap-3">
                                    <Link href={'/tatuadores'}>Tatuadores</Link>
                                    <Link href={'/tatuajes'}>Tatuajes</Link>
                                    <Link href={'/blog'}>Consejos</Link>
                                </div>

                            </div>
                            {/* <Search /> */}
                            <UserMenu
                                currentUser={currentUser}

                            />
                        </div>
                    </Container>
                </div>
                {/* <Categories /> */}
            </div>
        </div>
        // </Container>
    )


}

export default NavBar;