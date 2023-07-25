import Heading from "@/components/ui/Heading";
import { getPosts } from "@/libs/posts";
import PostGrid from "./components/PostGrid";

const Page = async ({
    children
}) => {

    const posts = await getPosts();

    return (
        <div>
            <Heading title={"This is my blog page"}
                subtitle={"This is my blog page subtitle"}
            />
            <PostGrid posts={posts} />


        </div>
    )
};
export default Page;