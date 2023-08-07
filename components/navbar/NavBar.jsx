import Container from "../ui/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";


async function NavBar({
    currentUser,
}) {

    // Create a navBar component that will be used in the layout.js file
    return (
        // <Container>
        <div className="fixed w-full bg-background shadow-sm text-foreground z-40">
            <div className="py-4 border-b-[1px] border-border">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

                        <Logo />
                        {/* <Search /> */}
                        <UserMenu
                            currentUser={currentUser}

                        />
                    </div>
                </Container>
            </div>
            {/* <Categories /> */}
        </div>
        // </Container>
    )


}

export default NavBar;