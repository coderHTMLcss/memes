'use client'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import InputFields from "./inputs";
import { Meme, MemeFormErrors } from "@/types";
import { useValidateForm } from "@/hooks/useValidateForm";

type ModalMemeProps = {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    meme: Meme;
    onSave: (meme: Meme) => void;
};

interface InputFieldProps {
    label: string;
    name: string;
    type?: "text" | "textarea" | "url" | "number";
    value?: string;
}

const formFields: InputFieldProps[] = [
    { label: "Id", name: "id", type: "number" },
    { label: "Name", name: "name", type: "text" },
    { label: "Likes", name: "likes", type: "number" },
    { label: "Image URL", name: "image", type: "url" },
];

export default function ModalMeme({ isOpen, onOpenChange, meme, onSave }: ModalMemeProps) {
    const [formData, setFormData] = useState<Meme>(meme);

    const [errors, validateForm] = useValidateForm(formData);

    useEffect(() => {
        setFormData(meme);
    }, [meme]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "likes" || name === "id" ? Number(value) : value,
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave(formData);
            onOpenChange();
        }
    };

    return (
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Editing Meme</ModalHeader>
                        <ModalBody>
                            <form className="space-y-4">
                                {formFields.map(({ label, name, type }) => (
                                    <div key={name}>
                                        <InputFields
                                            label={label}
                                            name={name}
                                            type={type}
                                            value={String(formData[name as keyof Meme])}
                                            onChange={handleChange}
                                        />
                                        {errors[name as keyof MemeFormErrors] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors[name as keyof MemeFormErrors]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
