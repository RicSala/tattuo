import NavBar from "@/components/navbar/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Footer from "@/components/footer/Footer";

const siteLayout = async ({ children }) => {

    const user = await getCurrentUser();

    // REVIEW: why not passing current user to children through the layout?
    return (
        <>
            <NavBar currentUser={user} />
            <div className="pb-20 pt-20 w-full  text-slate-900">
                {children}
            </div>
            <Footer />
        </>
    )
};
export default siteLayout;