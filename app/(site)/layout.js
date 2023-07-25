import NavBar from "@/components/navbar/NavBar";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Footer from "@/components/footer/Footer";
import Container from "@/components/Container";

const SiteLayout = async ({ children }) => {

    const user = await getCurrentUser();

    // REVIEW: why not passing current user to children through the layout?
    return (

        <div className="flex flex-col min-h-screen justify-between">
            <NavBar currentUser={user} />
            <div className="pb-20 pt-24 w-full bg-background text-foreground flex-grow">
                <Container>
                    {children}
                </Container>
            </div>
            <Footer />
        </div>

    )
};
export default SiteLayout;