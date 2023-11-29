import { merge } from "../../../utils/merge"
import { forwardRef } from "react";

const sizeVariants = {
    "sm": "w-full h-8 indent-2 border rounded",
    "md": "w-full h-10 indent-2.5 border rounded-md"
}

const colorVariants = {
    "gray-400": "text-gray-400 border-gray-400 placeholder-gray-400 bg-white",
    "white": "text-white border-red-400 bg-red-400",
    "gray-300": "text-gray-200 border-gray-200 bg-white",
    "blue-300": "text-white border-blue-300 bg-blue-300"
}

const Input = forwardRef(({ className = "", type = "text", value = "", size, color, name, id, required = true, disabled = false, placeholder, onClick, onChange }, ref) => {
    const classList = merge(sizeVariants[size], colorVariants[color], className, "focus:outline-none")

    return (
        <input
            className={classList}
            type={type}
            value={value}
            name={name}
            id={id}
            ref={ref}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            onClick={onClick}
            onChange={onChange}
        />
    )
})

export { Input }