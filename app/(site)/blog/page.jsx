import Heading from "@/components/Heading";
import Post from "./components/Post";

const page = ({
    children
}) => {
    return (
        <div>
            <Heading title={"This is my blog page"}
                subtitle={"This is my blog page subtitle"}
            />

            <Post />

        </div>
    )
};
export default page;