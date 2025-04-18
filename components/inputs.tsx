import { Input } from "@heroui/input";

interface InputFieldProps {
    label: string;
    name: string;
    type?: "text" | "textarea" | "url" | "number";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputFields: React.FC<InputFieldProps> = ({ label, name, type = "text", value, onChange }) => {
    if (name === 'id') return null;
    return (
        <label className="block">
            <span className="text-gray-700 font-medium">{label}</span>
            {type === "textarea" ? (
                <textarea
                    required
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <Input
                    required
                    name={name}
                    type={type}
                    value={value}
                    variant="bordered"
                    onChange={onChange}
                />
            )}
        </label>
    )
}


export default InputFields;

