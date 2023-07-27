import MultiStepWithResults from "@/components/forms/MultiStepWithResults";
import Heading from "@/components/ui/Heading";

export default function FinderPage({
    children,
    ...props
}) {


    return (
        <>
            <Heading title="Encuentra tu tatuador@"
                subtitle="Encuentra y guardar lxs artistas que más te gustan"
            />
            <MultiStepWithResults />
        </>
    )
}