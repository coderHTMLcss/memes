import { Meme, MemeFormErrors } from "@/types";
import { useState } from "react";

export const useValidateForm = (formData: Meme) => {
    const [errors, setErrors] = useState<MemeFormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: MemeFormErrors = {};

        if (!formData.name || formData.name.length < 3 || formData.name.length > 100) {
            newErrors.name = 'Назва повинна містити від 3 до 100 символів';
        }

        const jpgRegex = /^https?:\/\/.+\.(jpg|jpeg)(\?.*)?$/i;

        if (!formData.image || !jpgRegex.test(formData.image)) {
            newErrors.image = 'Має бути коректне посилання на JPG зображення';
        }

        if (formData.likes < 0 || formData.likes > 99) {
            newErrors.likes = 'Кількість лайків має бути від 0 до 99';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return [errors, validateForm] as const;
}