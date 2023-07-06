import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { getServerSession } from "next-auth";


async function NavBar({
    currentUser,
}) {

    const session = await getServerSession(authOptions)

    // Create a navBar component that will be used in the layout.js file
    return (
        // <Container>
        <div className="fixed w-full bg-white z-10 shadow-sm text-black">
            <div className="py-4 border-b-[1px]">
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