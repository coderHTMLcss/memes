import React from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = React.useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);

            return initialValue;
        };
    });


    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        };
    };

    React.useEffect(() => {
        const handleStoreChange = () => {
            const storedValue = localStorage.getItem(key);

            return storedValue ?
                setStoredValue(JSON.parse(storedValue)) :
                setStoredValue(initialValue);
        };

        window.addEventListener('storage', handleStoreChange);

        return () => window.removeEventListener('storage', handleStoreChange);
    }, [key, initialValue]);

    return [storedValue, setValue] as const;
};