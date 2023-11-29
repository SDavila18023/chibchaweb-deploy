import { merge } from "../../utils/merge"

const sizeVariants = {
    "xs": "w-full px-2 text-sm border-none rounded-sm",
    "sm": "h-8 px-3 border rounded",
    "md": "h-10 px-4 font-bold border rounded-md",
    "base": "h-10 px-4 font-bold border-b"
}

const colorVariants = {
    "white": "text-white border-red-400 bg-red-400",
    "red-400": "text-red-400 border-red-400 bg-white",
    "gray-200": "text-gray-200 border-gray-200",
    "blue-100": "text-blue-300 bg-blue-100",
    "blue-300": "text-white border-blue-300 bg-blue-300",
    "plan": "text-white border-red-400 bg-red-400 group-odd:border-blue-300 group-odd:bg-blue-300",
    "yellow-400": "text-blue-500 border-yellow-400 bg-yellow-400",
    "transparent": "text-blue-500 border-transparent",
    "blue-400": "text-blue-400 border-blue-400"
}

const Button = ({ className = "", children, size, color, onClick }) => {
    const classList = merge(sizeVariants[size], colorVariants[color], className)

    return (
        <button className={classList} type="button" onClick={onClick}>
            {children}
        </button>
    )
}

export { Button }