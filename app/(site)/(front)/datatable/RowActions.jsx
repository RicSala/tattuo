'use client'

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function RowActions({
    row,
    rowModel,
    table,
    tableModel,
}) {

    const router = useRouter();

    return (
        <Button variant="primary" size="sm" label="Ver perfil"
            onClick={() => router.push(`/tatuadores/profile/${row.original.id}`)}
        />

    );
}