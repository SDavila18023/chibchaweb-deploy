import { merge } from "../../utils/merge"

const colorVariants = {
    "blue-300": {
        container: "text-black font-inika border-blue-300",
        title: "text-blue-500 bg-blue-300",
        description: ""
    },
    "yellow-500": {
        container: "text-black font-inika border-yellow-500",
        title: "text-blue-500 bg-yellow-500",
        description: ""
    }
}

const TicketDescription = ({ className = "", color = "blue-300", title, description, }) => {
    const { container: containerVariant, title: titleVariant, description: descriptionVariant } = colorVariants[color]

    return (
        <div className={merge("mt-4 mb-8 border rounded-md", containerVariant, className)}>
            <h5 className={merge("text-center font-bold",titleVariant)}>{title}</h5>
            <p className={merge("p-3 text-sm text-start", descriptionVariant)}>{description}</p>
        </div>
    )
}

export { TicketDescription }