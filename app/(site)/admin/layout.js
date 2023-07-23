import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Link from "next/link";

const AdminLayout = async ({ children }) => {

    // REVIEW: why not passing current user to children through the layout?
    return (
        <Container>
            <div className="
            flex flex-row justify-between items-center
            ">
                <Heading title="Mis tatuajes guardados" />
                <div className="flex justify-end items-center py-2">
                    <div className="bg-blue-700 p-2 rounded-md text-white flex justify-center items-center">
                        <Link href="/admin/tatuajes/new">Nuevo tatuaje</Link>
                    </div>
                </div>
            </div>
            {children}
        </Container>
    )
};
export default AdminLayout;