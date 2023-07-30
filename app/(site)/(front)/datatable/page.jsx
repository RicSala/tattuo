import { getArtists } from "@/actions/getArtists";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getArtistsByCityName } from "@/actions/getArtistsByCityName";


export default async function page({

}) {

    const artists = await getArtists({});

    return (
        <div>
            <h1 className="text-lg font-bold">Data-table Page</h1>
            <DataTable columns={columns} data={artists} />
        </div>
    );
}