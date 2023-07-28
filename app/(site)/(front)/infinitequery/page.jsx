import { InfiniteScroll } from '@/components/InfiniteScroll';
import prisma from '@/libs/prismadb';
import CustomQueryClientProvider from '@/providers/QueryClientProvider';


export default async function InfiniteQueryPage({

}) {

    // initialData = first 10 items
    const initialData = await prisma.artistProfile.findMany({
        take: 10
    })




    return (
        <CustomQueryClientProvider>
            {/* <InfiniteScrollMock /> */}
            <InfiniteScroll
                initialData={initialData}
            />
        </CustomQueryClientProvider>
    );
}