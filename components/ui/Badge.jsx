export default function Badge({
    children,
    className = "",
    ...props

}) {
    return (
        <div className="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-primary-foreground mr-2 mb-2
        w-max
        ">
            {children}
        </div>
    );
}