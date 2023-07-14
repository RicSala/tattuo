import Link from 'next/link'
import Image from 'next/image'

export const mdxComponents = {
    a: ({ children, ...props }) => {
        return (
            <Link {...props} href={props.href || ''}>
                {children}
            </Link>
        )
    },
    img: ({ children, props }) => {
        // You need to do some work here to get the width and height of the image.
        // See the details below for my solution.

        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image {...props} />
    },
    // add a component call 'square' that renders a div with a 1:1 aspect ratio
    Heading: ({ children, props }) => {
        return (
            <h2 {...props} className='
            text-xl font-bold text-gray-900 dark:text-gray-100
            '>
                {children}
            </h2>
        )
    }
}