import { getPost, getPostData, getPosts } from "@/libs/posts";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from 'next/navigation' //TODO: check this
import PostBody from "../components/PostBody";


// export const generateStaticParams = async () => {

//     const posts = await getPosts();

//     return posts.map((post) => ({
//         params: {
//             postId: post.id,
//         }
//     }))

// }

// export const generateMetadata = async ({
//     params
// }) => {


//     const posts = await getPosts()
//     const { postId } = params;


//     const post = posts.find((post) => post.id === postId);

//     if (!post) {
//         return {
//             title: 'Post not found',
//         }
//     }

//     return {
//         title: post.title,
//     }
// };



const PostPage = async ({
    params
}) => {


    const post = await getPost(params.slug)

    console.log(post)

    if (!post) return notFound()


    // const posts = await getPosts()
    // const { postId } = params;

    // const post = posts.find((post) => post.id === postId);

    // if (!post || post.published === false) {
    //     return notFound();
    // }

    // const { title, date, contentHtml } = await getPostData(postId);

    // const pubDate = format(new Date(date), 'dd/MM/yyyy');

    return (

        <PostBody>
            <p>{post?.body}</p>
            {JSON.stringify(post)}
        </PostBody>

    )
};
export default PostPage;