'use client'

import TableMeme from "@/components/table";
import { Meme } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const BASE_URL = '/api/memes';

export default function TableView() {
    const [data, loading, error] = useFetch<Meme[]>(BASE_URL);


    const [value, setValue] = useLocalStorage('memes', data ?? []);

    const handleSave = (updatedMemes: Meme[]) => {
        setValue(updatedMemes);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <TableMeme memes={data ?? []} onSave={handleSave} />
    );
};
