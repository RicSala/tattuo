import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Link from "next/link";

const AdminLayout = async ({ children }) => {

    // REVIEW: why not passing current user to children through the layout?
    return (
        <Container>
            {children}
        </Container>
    )
};
export default AdminLayout;