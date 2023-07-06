import NavBar from "@/components/navbar/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const siteLayout = async ({ children }) => {

    const session = await getServerSession(authOptions)

    const user = session?.user

    return (
        <>
            <NavBar currentUser={user} />
            <div className="pb-20 pt-20 w-full  text-slate-900">
                {children}
            </div>
        </>
    )
};
export default siteLayout;