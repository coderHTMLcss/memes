import { useEffect, useState } from "react";
import axios from "axios";

import { MEMES_KEY } from "@/constants";

export const useFetch = <T,>(url: string): [T | null, boolean, Error | null] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                const dataFromStorage = localStorage.getItem(MEMES_KEY);

                if (dataFromStorage) {
                    setData(JSON.parse(dataFromStorage));
                    setLoading(false);
                };

                const response = await axios.get<T>(url, { signal });

                if (response.status !== 200) throw new Error("Failed to fetch");

                const serverData = response.data;
                const isDifferent = JSON.stringify(serverData) !== dataFromStorage;

                if (isDifferent) {
                    localStorage.setItem(MEMES_KEY, JSON.stringify(serverData));
                    setData(serverData);
                }

                setLoading(false);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError(err as Error);
                    setLoading(false);
                }
            } finally {
                setLoading(false)
            };
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return [data, loading, error];
};
