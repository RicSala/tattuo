import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'app/(site)/blog/blogposts');

export const getPosts = cache(() => {
    // Get file names under /posts
    const posts = fs.readdirSync(postsDirectory);

    return Promise.all(
        posts
            .filter((file) => path.extname(file) === '.mdx')
            .map(async (file) => {
                const filePath = `${postsDirectory}/${file}`
                const postContent = fs.readFileSync(filePath, 'utf8')
                const { data, content } = matter(postContent)

                if (data.published === false) {
                    return null
                }

                const slug = file.replace(/\.mdx$/, '');


                return { ...data, slug, body: content }
            })
    )
})

export async function getPost(slug) {
    const posts = await getPosts()
    return posts.find((post) => post.slug === slug)
}
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { remark } from 'remark';
// import html from 'remark-html';

// const postsDirectory = path.join(process.cwd(), 'app/(site)/blog/blogposts');

// export function getSortedPostsData() {
//     // Get file names under /posts
//     const fileNames = fs.readdirSync(postsDirectory);

//     const allPostsData = fileNames.map(fileName => {

//         // Remove ".md" from file name to get id
//         const id = fileName.replace(/\.md$/, '');

//         // Read markdown file as string
//         const fullPath = path.join(postsDirectory, fileName);
//         const fileContents = fs.readFileSync(fullPath, 'utf8');

//         // Use gray-matter to parse the post metadata section
//         const matterResult = matter(fileContents);

//         if (matterResult.published === false) {
//             return null
//         }

//         // Combine the data with the id
//         return {
//             id,
//             ...matterResult.data
//         }
//     });

//     // Sort posts by date
//     return allPostsData.sort((a, b) => {
//         if (a.date < b.date) {
//             return 1
//         } else {
//             return -1
//         }
//     });
// }

// export const getPostData = async (id) => {

//     const fullPath = path.join(postsDirectory, `${id}.md`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);

//     // Use remark to convert markdown into HTML string
//     const processedContent = await remark()
//         .use(html)
//         .process(matterResult.content);

//     const contentHtml = processedContent.toString();

//     // Combine the data with the id
//     return {
//         id,
//         contentHtml,
//         ...matterResult.data
//     }
// }