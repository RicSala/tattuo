import Badge from "@/components/ui/Badge";
import { format } from "date-fns";
import Link from "next/link";

const PostCard = ({
    post: {
        title,
        date,
        slug,
        tags,
    }
}) => {
    return (
        <Link href={`/blog/${slug}`}>
            <div className="
            border border-gray-200 dark:border-gray-800
            p-4 rounded-md
            hover:shadow-md
            cursor-pointer
            transition
            duration-200
            ease-in-out
            ">

                <h2>{title}</h2>
                {
                    format(new Date(date), 'dd/MM/yyyy')
                }
                {
                    tags && tags.length > 0 && (
                        <div className="flex flex-wrap">
                            {
                                tags.map((tag) => (
                                    <Badge key={tag} tag={tag}>
                                        {tag}
                                    </Badge>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </Link>
    )
};
export default PostCard;