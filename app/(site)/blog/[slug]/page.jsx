import { getPost, getPosts } from "@/libs/posts";
import PostBody from "../components/PostBody";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";




export const generateStaticParams = async () => {

    const posts = await getPosts();

    console.log("🟨 posts: ", posts)

    return posts.map((post) => ({
        slug: post.slug,
    }))

}

export const generateMetadata = async ({
    params
}) => {

    const { slug } = params;

    const post = await getPost(slug)


    if (!post) {
        return {
            title: 'Post not found',
        }
    }

    return {
        title: post.title,
    }
};

const PostPage = async ({
    params
}) => {

    const post = await getPost(params.slug)

    if (!post) return notFound()

    const { tags } = post;



    return (
        <div>
            {/* TITLE */}
            <h1 className="font-semibold text-3xl text-primary">{post.title}</h1>


            {/* TAGS */}
            {
                tags && tags.length > 0 && (
                    <div className="flex flex-wrap">
                        {
                            tags.map((tag) => (
                                <Badge key={tag}>
                                    {tag}
                                </Badge>
                            ))
                        }
                    </div>
                )
            }

            {/* BODY */}
            <PostBody>
                {post.body}
            </PostBody>
        </div>
    )
};
export default PostPage;