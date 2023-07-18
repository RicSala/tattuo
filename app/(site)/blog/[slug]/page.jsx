import { getPost, getPosts } from "@/libs/posts";
import PostBody from "../components/PostBody";
import { notFound } from "next/navigation";



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
            <h1 className="
            font-semibold text-3xl text-gray-900 dark:text-gray-100
            ">{post.title}</h1>

            {
                tags && tags.length > 0 && (
                    <div className="flex flex-wrap">
                        {
                            tags.map((tag) => (
                                <div key={tag} className="bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    {tag}
                                </div>
                            ))
                        }
                    </div>
                )
            }


            <PostBody>
                {post.body}
            </PostBody>
        </div>
    )
};
export default PostPage;