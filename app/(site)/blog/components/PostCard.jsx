import { format } from "date-fns";
import Link from "next/link";

const PostCard = ({
    post: {
        id,
        title,
        date,
    }
}) => {
    return (
        <Link href={`/blog/${id}`}>
            <div>
                {title}
                <h2>{id}</h2>
                {
                    format(new Date(date), 'dd/MM/yyyy')
                }
            </div>
        </Link>
    )
};
export default PostCard;