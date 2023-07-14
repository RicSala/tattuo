import { getSortedPostsData } from "@/libs/posts";
import PostCard from "./PostCard";

const Post = ({

}) => {

    const posts = getSortedPostsData();
    return (
        <section>

            {
                posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))

            }
        </section>
    )
};
export default Post;