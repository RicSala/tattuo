import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "../Container";


async function Footer({
    currentUser,
}) {

    return (
        // <Container>
        <div className="fixed w-full z-10 shadow-sm text-black bottom-0 bg-sky-400">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

                    </div>
                </Container>
            </div>
            {/* <Categories /> */}
        </div>
        // </Container>
    )


}

export default Footer;