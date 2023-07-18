import NavBar from "@/components/navbar/NavBar";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Footer from "@/components/footer/Footer";
import { UiProvider } from "@/providers/ui/UiProvider";
import CustomSessionProvider from "@/providers/SessionProvider";
import { AuthProvider } from "@/providers/auth/AuthProvider";
import ToasterContext from "@/providers/ToasterContext";
import RegisterModal from "@/components/modals/RegisterModal";
import RegisterArtistModal from "@/components/modals/RegisterArtistModal";
import LoginModal from "@/components/modals/LoginModal";

const siteLayout = async ({ children }) => {

    const user = await getCurrentUser();

    // REVIEW: why not passing current user to children through the layout?
    return (
        <UiProvider>
            <CustomSessionProvider>
                <AuthProvider>
                    <ToasterContext />
                    <RegisterModal />
                    <RegisterArtistModal />
                    <LoginModal />
                    <div className="flex flex-col min-h-full">
                        <NavBar currentUser={user} />
                        <div className="pb-20 pt-24 w-full  text-slate-900 flex-grow">
                            {children}
                        </div>
                        <Footer />
                    </div>
                </AuthProvider>
            </CustomSessionProvider>
        </UiProvider>
    )
};
export default siteLayout;