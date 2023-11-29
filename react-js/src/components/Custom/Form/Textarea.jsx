import { merge } from "../../../utils/merge"

const sizeVariants = {
    "md": "w-full py-2 px-3 border rounded-md"
}

const colorVariants = {
    "gray-200": "text-gray-200 border-gray-200 scroll:w-1.5 scroll-thumb:bg-blue-200 scroll-thumb:rounded-full"
}

const Textarea = ({ className = "", value, size, color, name, id, placeholder ="", onChange }) => {
    const classList = merge(sizeVariants[size], colorVariants[color], "resize-none", className)

    return (
        <textarea 
            className={classList}
            value={value}
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export { Textarea }