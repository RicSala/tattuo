import { getPosts } from "@/libs/posts";
import PostCard from "./PostCard";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from "./mdx-components";


const PostBody = ({
    children
}) => {

    return (
        <MDXRemote
            source={children}
            components={mdxComponents} />
    )
};
export default PostBody;