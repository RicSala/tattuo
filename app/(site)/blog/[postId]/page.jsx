import { getPostData, getSortedPostsData } from "@/libs/posts";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from 'next/navigation' //TODO: check this

export const generateMetadata = async ({
    params
}) => {


    const posts = getSortedPostsData()
    const { postId } = params;

    const post = posts.find((post) => post.id === postId);

    if (!post) {
        return {
            title: 'Post not found',
        }
    }

    return {
        title: post.title,
    }
};



const Post = async ({
    params
}) => {


    const posts = getSortedPostsData()
    const { postId } = params;

    if (!posts.find((post) => post.id === postId)) {
        return notFound();
    }

    const { title, date, contentHtml } = await getPostData(postId);

    const pubDate = format(new Date(date), 'dd/MM/yyyy');

    return (

        <article>
            <p>hello</p>
            <h1>{title}</h1>
            <h2>{pubDate}</h2>
            <Link href="/blog">Back to blog</Link>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

    )
};
export default Post;