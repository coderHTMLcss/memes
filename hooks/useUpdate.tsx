import { Meme } from "@/types";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

export const useUpdate = (initialValue: Meme[], callback: (memes: Meme[]) => void) => {
    const [allMemes, setAllMemes] = useState<Meme[]>(initialValue);
    const [value, setValue] = useLocalStorage("memes", allMemes ?? []);

    const handleSave = async (updatedMeme: Meme) => {
        try {
            const id = updatedMeme.id;
            const response = await axios.put(`/api/memes/${id}`, updatedMeme);

            if (response.status !== 200) throw new Error("Failed to update meme");

            const updatedList = allMemes.map((meme) =>
                meme.id === updatedMeme.id ? updatedMeme : meme
            );

            setAllMemes(updatedList);
            setValue(updatedList);
            callback(updatedList);
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return [allMemes, handleSave] as const;
};
