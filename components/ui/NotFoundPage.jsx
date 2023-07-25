import { getCurrentUser } from "@/actions/getCurrentUser";
import Footer from "../footer/Footer";
import NavBar from "../navbar/NavBar";

const NotFoundPage = ({
    children

}) => {

    const user = getCurrentUser();
    return (
        <div className="flex flex-col min-h-full">
            <NavBar currentUser={user} />
            <div className="pb-20 pt-24 w-full  text-slate-900 flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    )
};
export default NotFoundPage;