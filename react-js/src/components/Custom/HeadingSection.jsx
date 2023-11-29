import { merge } from "../../utils/merge"

const HeadingSection = ({ className ="", title, text }) => {

    return (
        <div className={merge("text-center", className)}>
            <h2 className="text-blue-400 text-xl font-bold font-inika sm:text-2xl lg:text-3xl">{title}</h2>
            <p className="mt-4 text-gray-200 text-sm sm:text-base">{text}</p>
        </div>
    )
}

export { HeadingSection }