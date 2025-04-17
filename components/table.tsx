import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/table";

import ModalMeme from "./modal";

import { Meme } from "@/types";
import { useUpdate } from "@/hooks/useUpdate";

export const columns = [
    { name: "Id", uid: "id" },
    { name: "Name", uid: "name" },
    { name: "Likes", uid: "likes" },
    { name: "Actions", uid: "actions" },
];

type ColumnKey = typeof columns[number]["uid"];

type TableMemeProps = {
    memes: Meme[];
    onSave: (memes: Meme[]) => void;
};

const TableMeme = ({ memes, onSave }: TableMemeProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

    const [allMemes, handleSave] = useUpdate(memes, onSave);

    const handleEdit = (meme: Meme) => {
        setSelectedMeme(meme);
        onOpen();
    };


    const renderCell = React.useCallback((meme: Meme, columnKey: ColumnKey) => {
        const cellValue = meme[columnKey as keyof Meme];

        switch (columnKey) {
            case "actions":
                return (
                    <Button
                        size="sm"
                        color="danger"
                        onPress={() => handleEdit(meme)}
                    >
                        Edit
                    </Button>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="sm:p-4">
            <Table aria-label="Meme list table">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={allMemes}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell className="border-1">{renderCell(item, columnKey as ColumnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {selectedMeme && (
                <ModalMeme
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onOpenChange={onOpenChange}
                    meme={selectedMeme}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default TableMeme;
